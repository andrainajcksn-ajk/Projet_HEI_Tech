import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMesLivres, ajouterLivre, supprimerLivre, getInitiales } from "../api";
import "../styles/meslivres.css";

const genresCouleurs = {
    "Roman": "#DCFCE7",
    "Science-fiction": "#EDE9FE",
    "Jeunesse": "#FEF9C3",
    "Histoire": "#DBEAFE",
    "Développement": "#FCE7F3",
    "Poésie": "#FEE2E2",
};

function MesLivres() {
    const navigate = useNavigate();
    const [onglet, setOnglet] = useState("depots");
    const [depots, setDepots] = useState([]);
    const [emprunts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOuvert, setModalOuvert] = useState(false);
    const [form, setForm] = useState({ titre: "", auteur: "", genre: "Roman", etat: "Très bon état", description: "" });
    const [erreurs, setErreurs] = useState({});

    const utilisateur = JSON.parse(localStorage.getItem("utilisateur") || "{}");
    const initiales = getInitiales(utilisateur.nom);

    const seDeconnecter = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        navigate("/");
    };

    useEffect(() => {
        const charger = async () => {
            try {
                const res = await getMesLivres();
                setDepots(res.data);
            } catch (err) {
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        charger();
    }, []);

    const valider = () => {
        const e = {};
        if (!form.titre.trim()) e.titre = "Le titre est requis";
        if (!form.auteur.trim()) e.auteur = "L'auteur est requis";
        return e;
    };

    const ouvrirModal = () => {
        setForm({ titre: "", auteur: "", genre: "Roman", etat: "Très bon état", description: "" });
        setErreurs({});
        setModalOuvert(true);
    };

    const changerChamp = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const soumettreFormulaire = async () => {
        const e = valider();
        if (Object.keys(e).length > 0) { setErreurs(e); return; }
        try {
            const res = await ajouterLivre(form);
            setDepots((prev) => [res.data.livre, ...prev]);
            setModalOuvert(false);
        } catch (err) {
            console.error("Erreur ajout livre", err);
        }
    };

    const retirerLivre = async (id) => {
        try {
            await supprimerLivre(id);
            setDepots((prev) => prev.filter((l) => l.id !== id));
        } catch (err) {
            console.error("Erreur suppression", err);
        }
    };

    const statutClass = (s) => s === "Disponible" ? "bs-g" : s === "En échange" ? "bs-a" : "bs-b";

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#355E3B", fontSize: "16px" }}>
            Chargement...
        </div>
    );

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
                    <div className="nav-item active">
                        <i className="fa-solid fa-book"></i> Mes livres
                        {depots.length > 0 && <span className="badge">{depots.length}</span>}
                    </div>
                    <div className="nav-item" onClick={() => navigate("/messages")}>
                        <i className="fa-solid fa-message"></i> Messages
                    </div>
                    <div className="nav-item" onClick={() => navigate("/explorer")}>
                        <i className="fa-solid fa-magnifying-glass"></i> Explorer
                    </div>
                    <div className="nav-item" onClick={() => navigate("/favoris")}>
                        <i className="fa-solid fa-heart"></i> Favoris
                    </div>
                    <div className="nav-label" style={{ marginTop: "20px" }}>Compte</div>
                    <div className="nav-item" onClick={() => navigate("/profil")}>
                        <i className="fa-solid fa-user"></i> Mon profil
                    </div>
                    <div className="nav-item" onClick={() => navigate("/parametres")}>
                        <i className="fa-solid fa-gear"></i> Paramètres
                    </div>
                    <div className="nav-item" onClick={seDeconnecter}>
                        <i className="fa-solid fa-right-from-bracket"></i> Déconnexion
                    </div>
                </div>
                <div className="sidebar-footer" onClick={() => navigate("/profil")}>
                    <div className="user-chip">
                        <div className="avatar-circle">{initiales}</div>
                        <div>
                            <div className="user-name">{utilisateur.nom}</div>
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
                        <div className={`tab ${onglet === "depots" ? "active" : ""}`} onClick={() => setOnglet("depots")}>
                            <i className="fa-solid fa-book"></i> Mes dépôts ({depots.length})
                        </div>
                        <div className={`tab ${onglet === "emprunts" ? "active" : ""}`} onClick={() => setOnglet("emprunts")}>
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
                                            <div className="book-cover" style={{ background: genresCouleurs[livre.genre] || "#DCFCE7" }}>
                                                <i className="fa-solid fa-book book-emoji" style={{ fontSize: "36px", color: "#355E3B" }}></i>
                                                <div className={`bstatus ${statutClass(livre.statut)}`}>{livre.statut}</div>
                                            </div>
                                            <div className="book-body">
                                                <div className="book-ttl">{livre.titre}</div>
                                                <div className="book-aut">{livre.auteur}</div>
                                                <div className="book-genre">{livre.genre}</div>
                                                <div className="book-actions">
                                                    <button className="btn-sm btn-edit">
                                                        <i className="fa-solid fa-pen"></i> Modifier
                                                    </button>
                                                    <button className="btn-sm btn-del" onClick={() => retirerLivre(livre.id)}>
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
                            <div className="empty-state">
                                <div className="empty-icon">📖</div>
                                <div className="empty-text">Aucun emprunt en cours</div>
                                <div className="empty-sub">Explorez les livres disponibles pour en emprunter</div>
                                <button className="add-btn" onClick={() => navigate("/explorer")} style={{ marginTop: "16px" }}>
                                    <i className="fa-solid fa-magnifying-glass"></i> Explorer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {modalOuvert && (
                <div className="overlay" onClick={() => setModalOuvert(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-title">Déposer un livre</div>
                        <div className="modal-sub">Remplissez les informations du livre que vous souhaitez partager</div>

                        <div className="form-group">
                            <div className="form-label">Titre du livre *</div>
                            <input className={`form-input ${erreurs.titre ? "input-error" : ""}`} type="text" name="titre" placeholder="Ex: Le Petit Prince" value={form.titre} onChange={changerChamp} />
                            {erreurs.titre && <div className="form-error">{erreurs.titre}</div>}
                        </div>

                        <div className="form-group">
                            <div className="form-label">Auteur *</div>
                            <input className={`form-input ${erreurs.auteur ? "input-error" : ""}`} type="text" name="auteur" placeholder="Ex: Antoine de Saint-Exupéry" value={form.auteur} onChange={changerChamp} />
                            {erreurs.auteur && <div className="form-error">{erreurs.auteur}</div>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <div className="form-label">Genre</div>
                                <select className="form-select" name="genre" value={form.genre} onChange={changerChamp}>
                                    {Object.keys(genresCouleurs).map((g) => <option key={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="form-label">État du livre</div>
                                <select className="form-select" name="etat" value={form.etat} onChange={changerChamp}>
                                    <option>Très bon état</option>
                                    <option>Bon état</option>
                                    <option>État correct</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-label">Description (optionnel)</div>
                            <textarea className="form-textarea" name="description" placeholder="Décrivez brièvement le livre..." value={form.description} onChange={changerChamp} />
                        </div>

                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setModalOuvert(false)}>Annuler</button>
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