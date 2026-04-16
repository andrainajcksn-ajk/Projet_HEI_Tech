import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/meslivres.css";

const depotInitial = [
    { id: 1, titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry", genre: "Roman", couleur: "#DCFCE7", emoji: "📗", statut: "Disponible" },
    { id: 2, titre: "L'Alchimiste", auteur: "Paulo Coelho", genre: "Roman", couleur: "#FEF9C3", emoji: "📙", statut: "En échange" },
    { id: 3, titre: "1984", auteur: "George Orwell", genre: "Science-fiction", couleur: "#DBEAFE", emoji: "📘", statut: "Disponible" },
    { id: 4, titre: "Les Misérables", auteur: "Victor Hugo", genre: "Roman", couleur: "#FCE7F3", emoji: "📕", statut: "Prêté" },
];

const empruntsInitial = [
    {
        id: 1, titre: "Le Comte de Monte-Cristo", auteur: "Alexandre Dumas",
        couleur: "#DCFCE7", emoji: "📗",
        proprietaire: "Haja Mamy", initiales: "HM", couleurAv: "#DCFCE7", texteAv: "#166534",
        dateEmprunt: "28 mars 2026", dateRetour: "28 avril 2026",
    },
    {
        id: 2, titre: "Dune", auteur: "Frank Herbert",
        couleur: "#EDE9FE", emoji: "📔",
        proprietaire: "Ravo Mamy", initiales: "RM", couleurAv: "#EDE9FE", texteAv: "#5b21b6",
        dateEmprunt: "1 avril 2026", dateRetour: "1 mai 2026",
    },
];

const genresCouleurs = {
    "Roman": "#DCFCE7",
    "Science-fiction": "#EDE9FE",
    "Jeunesse": "#FEF9C3",
    "Histoire": "#DBEAFE",
    "Développement": "#FCE7F3",
    "Poésie": "#FEE2E2",
};

const genresEmojis = {
    "Roman": "📗",
    "Science-fiction": "📔",
    "Jeunesse": "📙",
    "Histoire": "📘",
    "Développement": "📕",
    "Poésie": "📒",
};

function MesLivres() {
    const navigate = useNavigate();
    const [onglet, setOnglet] = useState("depots");
    const [depots, setDepots] = useState(depotInitial);
    const [emprunts, setEmprunts] = useState(empruntsInitial);
    const [modalOuvert, setModalOuvert] = useState(false);

    const [form, setForm] = useState({
        titre: "",
        auteur: "",
        genre: "Roman",
        etat: "Très bon état",
        description: "",
    });
    const [erreurs, setErreurs] = useState({});

    const ouvrirModal = () => {
        setForm({ titre: "", auteur: "", genre: "Roman", etat: "Très bon état", description: "" });
        setErreurs({});
        setModalOuvert(true);
    };

    const fermerModal = () => setModalOuvert(false);

    const changerChamp = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const valider = () => {
        const nouvellesErreurs = {};
        if (!form.titre.trim()) nouvellesErreurs.titre = "Le titre est requis";
        if (!form.auteur.trim()) nouvellesErreurs.auteur = "L'auteur est requis";
        return nouvellesErreurs;
    };

    const soumettreFormulaire = () => {
        const nouvellesErreurs = valider();
        if (Object.keys(nouvellesErreurs).length > 0) {
            setErreurs(nouvellesErreurs);
            return;
        }
        const nouveauLivre = {
            id: Date.now(),
            titre: form.titre,
            auteur: form.auteur,
            genre: form.genre,
            couleur: genresCouleurs[form.genre] || "#DCFCE7",
            emoji: genresEmojis[form.genre] || "📗",
            statut: "Disponible",
        };
        setDepots((prev) => [nouveauLivre, ...prev]);
        fermerModal();
    };

    const retirerLivre = (id) => {
        setDepots((prev) => prev.filter((l) => l.id !== id));
    };

    const rendreLivre = (id) => {
        setEmprunts((prev) => prev.filter((l) => l.id !== id));
    };

    const statutClass = (statut) => {
        if (statut === "Disponible") return "bs-g";
        if (statut === "En échange") return "bs-a";
        return "bs-b";
    };

    return (
        <div className="db">

            <div className="sidebar">
                <div className="logo-area">
                    <div className="logo-title">Atero ka Alao</div>
                    <div className="logo-sub">Échange de livres</div>
                </div>
                <div className="nav-section">
                    <div className="nav-label">Menu</div>
                    <div className="nav-item" onClick={() => navigate("/dashboard")}>
                        <i className="fa-solid fa-house"></i> Accueil
                    </div>
                    <div className="nav-item active" onClick={() => navigate("/meslivres")}>
                        <i className="fa-solid fa-book"></i> Mes livres
                        <span className="badge">{depots.length}</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate("/messages")}>
                        <i className="fa-solid fa-message"></i> Messages
                        <span className="badge">3</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate("/explorer")}>
                        <i className="fa-solid fa-magnifying-glass"></i> Explorer
                    </div>
                    <div className="nav-item" onClick={() => navigate("/dashboard")}>
                        <i className="fa-solid fa-heart"></i> Favoris
                    </div>
                    <div className="nav-label" style={{ marginTop: "20px" }}>Compte</div>
                    <div className="nav-item" onClick={() => navigate("/profil")}>
                        <i className="fa-solid fa-user"></i> Mon profil
                    </div>
                    <div className="nav-item">
                        <i className="fa-solid fa-gear"></i> Paramètres
                    </div>
                    <div className="nav-item" onClick={() => navigate("/")}>
                        <i className="fa-solid fa-right-from-bracket"></i> Déconnexion
                    </div>
                </div>
                <div className="sidebar-footer">
                    <div className="user-chip">
                        <div className="avatar-circle">JD</div>
                        <div>
                            <div className="user-name">Jean Dupont</div>
                            <div className="user-status">En ligne</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="db-main">
                <div className="topbar">
                    <div>
                        <div className="topbar-title">Mes livres</div>
                        <div className="topbar-sub">Gérez vos dépôts et vos emprunts</div>
                    </div>
                    <button className="add-btn" onClick={ouvrirModal}>
                        <i className="fa-solid fa-plus"></i> Ajouter un livre
                    </button>
                </div>

                <div className="ml-content">

                    <div className="tabs">
                        <div
                            className={`tab ${onglet === "depots" ? "active" : ""}`}
                            onClick={() => setOnglet("depots")}
                        >
                            <i className="fa-solid fa-book"></i> Mes dépôts ({depots.length})
                        </div>
                        <div
                            className={`tab ${onglet === "emprunts" ? "active" : ""}`}
                            onClick={() => setOnglet("emprunts")}
                        >
                            <i className="fa-solid fa-book-open"></i> Mes emprunts ({emprunts.length})
                        </div>
                    </div>

                    {onglet === "depots" && (
                        <div>
                            <div className="section-title">Livres que j'ai déposés</div>
                            {depots.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">📭</div>
                                    <div className="empty-text">Aucun livre déposé</div>
                                    <div className="empty-sub">Cliquez sur "Ajouter un livre" pour commencer</div>
                                    <button className="add-btn" onClick={ouvrirModal} style={{ marginTop: "16px" }}>
                                        <i className="fa-solid fa-plus"></i> Ajouter un livre
                                    </button>
                                </div>
                            ) : (
                                <div className="books-grid">
                                    {depots.map((livre) => (
                                        <div key={livre.id} className="book-card">
                                            <div className="book-cover" style={{ background: livre.couleur }}>
                                                <span className="book-emoji">{livre.emoji}</span>
                                                <div className={`bstatus ${statutClass(livre.statut)}`}>
                                                    {livre.statut}
                                                </div>
                                            </div>
                                            <div className="book-body">
                                                <div className="book-ttl">{livre.titre}</div>
                                                <div className="book-aut">{livre.auteur}</div>
                                                <div className="book-genre">{livre.genre}</div>
                                                <div className="book-actions">
                                                    <button className="btn-sm btn-edit">
                                                        <i className="fa-solid fa-pen"></i> Modifier
                                                    </button>
                                                    <button
                                                        className="btn-sm btn-del"
                                                        onClick={() => retirerLivre(livre.id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i> Retirer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {onglet === "emprunts" && (
                        <div>
                            <div className="section-title">Livres que j'ai empruntés</div>
                            {emprunts.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">📖</div>
                                    <div className="empty-text">Aucun emprunt en cours</div>
                                    <div className="empty-sub">Explorez les livres disponibles pour en emprunter</div>
                                    <button
                                        className="add-btn"
                                        onClick={() => navigate("/explorer")}
                                        style={{ marginTop: "16px" }}
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i> Explorer
                                    </button>
                                </div>
                            ) : (
                                <div className="emprunts-list">
                                    {emprunts.map((emprunt) => (
                                        <div key={emprunt.id} className="emprunt-card">
                                            <div className="emprunt-cover" style={{ background: emprunt.couleur }}>
                                                {emprunt.emoji}
                                            </div>
                                            <div className="emprunt-info">
                                                <div className="emprunt-title">{emprunt.titre}</div>
                                                <div className="emprunt-author">{emprunt.auteur}</div>
                                                <div className="emprunt-owner">
                                                    <div className="emprunt-av" style={{ background: emprunt.couleurAv, color: emprunt.texteAv }}>
                                                        {emprunt.initiales}
                                                    </div>
                                                    <div className="emprunt-owner-name">
                                                        Emprunté auprès de {emprunt.proprietaire}
                                                    </div>
                                                </div>
                                                <div className="emprunt-date">
                                                    Emprunté le {emprunt.dateEmprunt} · À rendre avant le {emprunt.dateRetour}
                                                </div>
                                            </div>
                                            <div className="emprunt-actions">
                                                <button
                                                    className="btn-msg"
                                                    onClick={() => navigate("/messages")}
                                                >
                                                    <i className="fa-solid fa-message"></i> Message
                                                </button>
                                                <button
                                                    className="btn-return"
                                                    onClick={() => rendreLivre(emprunt.id)}
                                                >
                                                    <i className="fa-solid fa-rotate-left"></i> Rendre
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {modalOuvert && (
                <div className="overlay" onClick={fermerModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-title">Déposer un livre</div>
                        <div className="modal-sub">
                            Remplissez les informations du livre que vous souhaitez partager
                        </div>

                        <div className="form-group">
                            <div className="form-label">Titre du livre *</div>
                            <input
                                className={`form-input ${erreurs.titre ? "input-error" : ""}`}
                                type="text"
                                name="titre"
                                placeholder="Ex: Le Petit Prince"
                                value={form.titre}
                                onChange={changerChamp}
                            />
                            {erreurs.titre && <div className="form-error">{erreurs.titre}</div>}
                        </div>

                        <div className="form-group">
                            <div className="form-label">Auteur *</div>
                            <input
                                className={`form-input ${erreurs.auteur ? "input-error" : ""}`}
                                type="text"
                                name="auteur"
                                placeholder="Ex: Antoine de Saint-Exupéry"
                                value={form.auteur}
                                onChange={changerChamp}
                            />
                            {erreurs.auteur && <div className="form-error">{erreurs.auteur}</div>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <div className="form-label">Genre</div>
                                <select
                                    className="form-select"
                                    name="genre"
                                    value={form.genre}
                                    onChange={changerChamp}
                                >
                                    {Object.keys(genresCouleurs).map((g) => (
                                        <option key={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="form-label">État du livre</div>
                                <select
                                    className="form-select"
                                    name="etat"
                                    value={form.etat}
                                    onChange={changerChamp}
                                >
                                    <option>Très bon état</option>
                                    <option>Bon état</option>
                                    <option>État correct</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-label">Description (optionnel)</div>
                            <textarea
                                className="form-textarea"
                                name="description"
                                placeholder="Décrivez brièvement le livre..."
                                value={form.description}
                                onChange={changerChamp}
                            />
                        </div>

                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={fermerModal}>
                                Annuler
                            </button>
                            <button className="btn-submit" onClick={soumettreFormulaire}>
                                <i className="fa-solid fa-plus"></i> Déposer le livre
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MesLivres;