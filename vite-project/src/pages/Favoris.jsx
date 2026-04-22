import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoris, supprimerFavori, getInitiales } from "../api";
import "../styles/favoris.css";

const COULEURS = ["#DCFCE7", "#DBEAFE", "#FEF9C3", "#FCE7F3", "#EDE9FE", "#FEE2E2"];
const TEXTES = ["#166534", "#1e40af", "#854d0e", "#9d174d", "#5b21b6", "#991b1b"];

function Favoris() {
    const navigate = useNavigate();
    const [livres, setLivres] = useState([]);
    const [onglet, setOnglet] = useState("livres");
    const [recherche, setRecherche] = useState("");
    const [loading, setLoading] = useState(true);

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
                const res = await getFavoris();
                setLivres(res.data);
            } catch (err) {
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        charger();
    }, []);

    const retirerLivre = async (id) => {
        try {
            await supprimerFavori(id);
            setLivres((prev) => prev.filter((l) => l.id !== id));
        } catch (err) {
            console.error("Erreur suppression favori", err);
        }
    };

    const livresFiltres = livres.filter((l) =>
        l.titre.toLowerCase().includes(recherche.toLowerCase()) ||
        l.auteur.toLowerCase().includes(recherche.toLowerCase())
    );

    const disponibles = livres.filter((l) => l.statut === "Disponible").length;

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
                    <div className="nav-item" onClick={() => navigate("/dashboard")}><i className="fa-solid fa-house"></i> Accueil</div>
                    <div className="nav-item" onClick={() => navigate("/meslivres")}><i className="fa-solid fa-book"></i> Mes livres</div>
                    <div className="nav-item" onClick={() => navigate("/messages")}><i className="fa-solid fa-message"></i> Messages</div>
                    <div className="nav-item" onClick={() => navigate("/explorer")}><i className="fa-solid fa-magnifying-glass"></i> Explorer</div>
                    <div className="nav-item active"><i className="fa-solid fa-heart"></i> Favoris</div>
                    <div className="nav-label" style={{ marginTop: "20px" }}>Compte</div>
                    <div className="nav-item" onClick={() => navigate("/profil")}><i className="fa-solid fa-user"></i> Mon profil</div>
                    <div className="nav-item" onClick={() => navigate("/parametres")}><i className="fa-solid fa-gear"></i> Paramètres</div>
                    <div className="nav-item" onClick={seDeconnecter}><i className="fa-solid fa-right-from-bracket"></i> Déconnexion</div>
                </div>
                <div className="sidebar-footer" onClick={() => navigate("/profil")}>
                    <div className="user-chip">
                        <div className="avatar-circle">{initiales}</div>
                        <div><div className="user-name">{utilisateur.nom}</div><div className="user-status">En ligne</div></div>
                    </div>
                </div>
            </div>

            <div className="db-main">
                <div className="topbar">
                    <div>
                        <div className="topbar-title">Mes favoris</div>
                        <div className="topbar-sub">Livres et membres sauvegardés</div>
                    </div>
                    <div className="topbar-right">
                        <input className="search-fav" type="text" placeholder="Rechercher dans les favoris..." value={recherche} onChange={(e) => setRecherche(e.target.value)} />
                    </div>
                </div>

                <div className="fav-content">
                    <div className="stats-banner">
                        <div className="stat-mini">
                            <div className="stat-icon" style={{ background: "#FCE7F3" }}><i className="fa-solid fa-heart" style={{ color: "#9d174d" }}></i></div>
                            <div><div className="stat-val">{livres.length}</div><div className="stat-lbl">Livres sauvegardés</div></div>
                        </div>
                        <div className="stat-mini">
                            <div className="stat-icon" style={{ background: "#DCFCE7" }}><i className="fa-solid fa-users" style={{ color: "#166534" }}></i></div>
                            <div><div className="stat-val">0</div><div className="stat-lbl">Membres suivis</div></div>
                        </div>
                        <div className="stat-mini">
                            <div className="stat-icon" style={{ background: "#DBEAFE" }}><i className="fa-solid fa-book-open" style={{ color: "#1e40af" }}></i></div>
                            <div><div className="stat-val">{disponibles}</div><div className="stat-lbl">Disponibles maintenant</div></div>
                        </div>
                    </div>

                    <div className="tabs">
                        <div className={`tab ${onglet === "livres" ? "active" : ""}`} onClick={() => setOnglet("livres")}>
                            <i className="fa-solid fa-heart"></i> Livres ({livres.length})
                        </div>
                        <div className={`tab ${onglet === "membres" ? "active" : ""}`} onClick={() => setOnglet("membres")}>
                            <i className="fa-solid fa-users"></i> Membres (0)
                        </div>
                    </div>

                    {onglet === "livres" && (
                        livresFiltres.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">💔</div>
                                <div className="empty-text">Aucun livre en favori</div>
                                <div className="empty-sub">Explorez les livres disponibles et ajoutez-en à vos favoris</div>
                            </div>
                        ) : (
                            <div className="books-grid">
                                {livresFiltres.map((livre, index) => {
                                    const couleur = COULEURS[index % COULEURS.length];
                                    const propCouleur = COULEURS[livre.proprietaire_id % COULEURS.length];
                                    const propTexte = TEXTES[livre.proprietaire_id % TEXTES.length];
                                    const ini = getInitiales(livre.proprietaire_nom);
                                    return (
                                        <div key={livre.id} className="fav-card">
                                            <div className="fav-cover" style={{ background: couleur }}>
                                                <i className="fa-solid fa-book fav-emoji" style={{ fontSize: "40px", color: "#355E3B" }}></i>
                                                <div className="fav-heart-btn" onClick={() => retirerLivre(livre.id)} title="Retirer des favoris">
                                                    <i className="fa-solid fa-heart" style={{ color: "#e11d48", fontSize: "12px" }}></i>
                                                </div>
                                                <div className={`fav-status ${livre.statut === "Disponible" ? "fs-g" : "fs-a"}`}>{livre.statut}</div>
                                            </div>
                                            <div className="fav-body">
                                                <div className="fav-title">{livre.titre}</div>
                                                <div className="fav-author">{livre.auteur}</div>
                                                <div className="fav-genre">{livre.genre}</div>
                                                <div className="fav-footer">
                                                    <div className="fav-owner">
                                                        <div className="fav-av" style={{ background: propCouleur, color: propTexte }}>{ini}</div>
                                                        <div className="fav-name">{livre.proprietaire_nom}</div>
                                                    </div>
                                                    <button className="ask-btn" onClick={() => navigate("/messages")}>Demander</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    )}

                    {onglet === "membres" && (
                        <div className="empty-state">
                            <div className="empty-icon">👥</div>
                            <div className="empty-text">Aucun membre suivi</div>
                            <div className="empty-sub">Explorez la communauté pour suivre des membres</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Favoris;