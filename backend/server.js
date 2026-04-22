const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

// ── Middleware vérification token ──
const verifierToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token manquant" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.utilisateur = decoded;
        next();
    } catch {
        res.status(403).json({ message: "Token invalide" });
    }
};

// ════════════════════════════════
// AUTH
// ════════════════════════════════

// Inscription
app.post("/register", async (req, res) => {
    const { nom, email, password } = req.body;
    if (!nom || !email || !password) {
        return res.status(400).json({ message: "Champs requis" });
    }
    try {
        const existant = await pool.query(
            "SELECT id FROM utilisateurs WHERE email = $1", [email]
        );
        if (existant.rows.length > 0) {
            return res.status(409).json({ message: "Email déjà utilisé" });
        }
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES ($1, $2, $3) RETURNING id, nom, email",
            [nom, email, hash]
        );
        const token = jwt.sign(
            { id: result.rows[0].id, nom: result.rows[0].nom },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({ message: "Compte créé !", token, utilisateur: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// Connexion
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Champs requis" });
    }
    try {
        const result = await pool.query(
            "SELECT * FROM utilisateurs WHERE email = $1", [email]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
        const utilisateur = result.rows[0];
        const valide = await bcrypt.compare(password, utilisateur.mot_de_passe);
        if (!valide) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
        const token = jwt.sign(
            { id: utilisateur.id, nom: utilisateur.nom },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({
            message: "Connexion réussie !",
            token,
            utilisateur: {
                id: utilisateur.id,
                nom: utilisateur.nom,
                email: utilisateur.email,
                ville: utilisateur.ville,
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// ════════════════════════════════
// LIVRES
// ════════════════════════════════

// Récupérer tous les livres disponibles
app.get("/livres", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.*, u.nom AS proprietaire_nom
            FROM livres l
            JOIN utilisateurs u ON l.proprietaire_id = u.id
            ORDER BY l.date_ajout DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// Récupérer les livres d'un utilisateur
app.get("/livres/moi", verifierToken, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM livres WHERE proprietaire_id = $1 ORDER BY date_ajout DESC",
            [req.utilisateur.id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// Ajouter un livre
app.post("/livres", verifierToken, async (req, res) => {
    const { titre, auteur, genre, etat, description } = req.body;
    if (!titre || !auteur) {
        return res.status(400).json({ message: "Titre et auteur requis" });
    }
    try {
        const result = await pool.query(
            `INSERT INTO livres (titre, auteur, genre, etat, description, proprietaire_id)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [titre, auteur, genre, etat, description, req.utilisateur.id]
        );
        res.json({ message: "Livre ajouté !", livre: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// Supprimer un livre
app.delete("/livres/:id", verifierToken, async (req, res) => {
    try {
        await pool.query(
            "DELETE FROM livres WHERE id = $1 AND proprietaire_id = $2",
            [req.params.id, req.utilisateur.id]
        );
        res.json({ message: "Livre supprimé !" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// ════════════════════════════════
// MESSAGES
// ════════════════════════════════

// Récupérer les conversations
app.get("/messages/conversations", verifierToken, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT ON (LEAST(expediteur_id, destinataire_id), GREATEST(expediteur_id, destinataire_id))
                m.*,
                u.nom AS interlocuteur_nom
            FROM messages m
            JOIN utilisateurs u ON u.id = CASE
                WHEN m.expediteur_id = $1 THEN m.destinataire_id
                ELSE m.expediteur_id
            END
            WHERE m.expediteur_id = $1 OR m.destinataire_id = $1
            ORDER BY LEAST(expediteur_id, destinataire_id),
                     GREATEST(expediteur_id, destinataire_id),
                     date_envoi DESC
        `, [req.utilisateur.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// Récupérer les messages d'une conversation
app.get("/messages/:interlocuteurId", verifierToken, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT m.*, u.nom AS expediteur_nom
            FROM messages m
            JOIN utilisateurs u ON u.id = m.expediteur_id
            WHERE (m.expediteur_id = $1 AND m.destinataire_id = $2)
               OR (m.expediteur_id = $2 AND m.destinataire_id = $1)
            ORDER BY m.date_envoi ASC
        `, [req.utilisateur.id, req.params.interlocuteurId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// Envoyer un message
app.post("/messages", verifierToken, async (req, res) => {
    const { destinataire_id, contenu } = req.body;
    if (!destinataire_id || !contenu) {
        return res.status(400).json({ message: "Champs requis" });
    }
    try {
        const result = await pool.query(
            `INSERT INTO messages (expediteur_id, destinataire_id, contenu)
             VALUES ($1, $2, $3) RETURNING *`,
            [req.utilisateur.id, destinataire_id, contenu]
        );
        res.json({ message: "Message envoyé !", data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// ════════════════════════════════
// PROFIL
// ════════════════════════════════

// Récupérer son profil
app.get("/profil", verifierToken, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, nom, email, ville, bio, genre_prefere, date_inscription FROM utilisateurs WHERE id = $1",
            [req.utilisateur.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// Modifier son profil
app.put("/profil", verifierToken, async (req, res) => {
    const { nom, ville, bio, genre_prefere } = req.body;
    try {
        const result = await pool.query(
            `UPDATE utilisateurs SET nom=$1, ville=$2, bio=$3, genre_prefere=$4
             WHERE id=$5 RETURNING id, nom, email, ville, bio, genre_prefere`,
            [nom, ville, bio, genre_prefere, req.utilisateur.id]
        );
        res.json({ message: "Profil mis à jour !", utilisateur: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
});

// ════════════════════════════════
// FAVORIS
// ════════════════════════════════

// Ajouter un livre en favori
app.post("/favoris/livres/:livreId", verifierToken, async (req, res) => {
    try {
        await pool.query(
            "INSERT INTO favoris_livres (utilisateur_id, livre_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
            [req.utilisateur.id, req.params.livreId]
        );
        res.json({ message: "Ajouté aux favoris !" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Retirer un livre des favoris
app.delete("/favoris/livres/:livreId", verifierToken, async (req, res) => {
    try {
        await pool.query(
            "DELETE FROM favoris_livres WHERE utilisateur_id=$1 AND livre_id=$2",
            [req.utilisateur.id, req.params.livreId]
        );
        res.json({ message: "Retiré des favoris !" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Récupérer ses favoris
app.get("/favoris", verifierToken, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.*, u.nom AS proprietaire_nom
            FROM favoris_livres fl
            JOIN livres l ON fl.livre_id = l.id
            JOIN utilisateurs u ON l.proprietaire_id = u.id
            WHERE fl.utilisateur_id = $1
        `, [req.utilisateur.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Serveur lancé sur http://localhost:${process.env.PORT || 5000}`);
});