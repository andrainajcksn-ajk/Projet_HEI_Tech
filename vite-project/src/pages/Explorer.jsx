import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLivres, getInitiales } from "../api";
import "../styles/explorer.css";

const genres = ["Tous", "Roman", "Science-fiction", "Jeunesse", "Histoire", "Développement", "Poésie"];
const statuts = ["Tous", "Disponible", "En échange"];
const genresCouleurs = { "Roman": "#DCFCE7", "Science-fiction": "#EDE9FE", "Jeunesse": "#FEF9C3", "Histoire": "#DBEAFE", "Développement": "#FCE7F3", "Poésie": "#FEE2E2" };
const COULEURS = ["#DCFCE7", "#DBEAFE", "#FEF9C3", "#FCE7F3", "#EDE9FE", "#FEE2E2"];
const TEXTES = ["#166534", "#1e40af", "#854d0e", "#9d174d", "#5b21b6", "#991b1b"];

function Explorer() {
    const navigate = useNavigate();
    const [tousLesLivres, setTousLesLivres] = useState([]);
    const [recherche, setRecherche] = useState("");
    const [genreActif, setGenreActif] = useState("Tous");
    const [statutActif, setStatutActif] = useState("Tous");
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
                const res = await getLivres();
                setTousLesLivres(res.data);
            } catch (err) {
                console.error("Erreur chargement livres", err);
            } finally {
                setLoading(false);
            }
        };
        charger();
    }, []);

    const livresFiltres = tousLesLivres.filter((l) => {
        const matchR = l.titre.toLowerCase().includes(recherche.toLowerCase()) || l.auteur.toLowerCase().includes(recherche.toLowerCase()) || (l.genre || "").toLowerCase().includes(recherche.toLowerCase());
        const matchG = genreActif === "Tous" || l.genre === genreActif;
        const matchS = statutActif === "Tous" || l.statut === statutActif;
        return matchR && matchG && matchS;
    });

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
                    <div className="nav-item active"><i className="fa-solid fa-magnifying-glass"></i> Explorer</div>
                    <div className="nav-item" onClick={() => navigate("/favoris")}><i className="fa-solid fa-heart"></i> Favoris</div>
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
                    <div className="topbar-title">Explorer les livres</div>
                    <div className="topbar-sub">Découvrez les livres disponibles près de chez vous</div>
                </div>

                <div className="explorer-body">
                    <div className="filters-panel">
                        <div>
                            <div className="filter-title">Genres</div>
                            <div className="filter-group">
                                {genres.map((genre) => (
                                    <div key={genre} className={`filter-item ${genreActif === genre ? "active" : ""}`} onClick={() => setGenreActif(genre)}>
                                        <div className="filter-check">{genreActif === genre ? "✓" : ""}</div>
                                        {genre}
                                        <span className="filter-count">
                                            {genre === "Tous" ? tousLesLivres.length : tousLesLivres.filter((l) => l.genre === genre).length}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filter-sep"></div>
                        <div>
                            <div className="filter-title">Disponibilité</div>
                            <div className="filter-group">
                                {statuts.map((s) => (
                                    <div key={s} className={`filter-item ${statutActif === s ? "active" : ""}`} onClick={() => setStatutActif(s)}>
                                        <div className="filter-check">{statutActif === s ? "✓" : ""}</div>
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="books-area">
                        <div className="search-bar">
                            <input className="search-input" type="text" placeholder="Rechercher un titre, auteur, genre..." value={recherche} onChange={(e) => setRecherche(e.target.value)} />
                        </div>
                        <div className="results-info"><span>{livresFiltres.length} livre{livresFiltres.length > 1 ? "s" : ""}</span> trouvé{livresFiltres.length > 1 ? "s" : ""}</div>

                        {livresFiltres.length === 0 ? (
                            <div className="no-results">
                                <div className="no-results-icon">📭</div>
                                <div className="no-results-text">Aucun livre trouvé</div>
                                <div className="no-results-sub">Essayez un autre terme de recherche</div>
                            </div>
                        ) : (
                            <div className="books-grid">
                                {livresFiltres.map((livre, index) => {
                                    const couleur = genresCouleurs[livre.genre] || "#DCFCE7";
                                    const propCouleur = COULEURS[livre.proprietaire_id % COULEURS.length];
                                    const propTexte = TEXTES[livre.proprietaire_id % TEXTES.length];
                                    const ini = getInitiales(livre.proprietaire_nom);
                                    return (
                                        <div key={livre.id} className="book-card">
                                            <div className="book-cover-area" style={{ background: couleur }}>
                                                <i className="fa-solid fa-book book-emoji" style={{ fontSize: "38px", color: "#355E3B" }}></i>
                                                <div className={`book-status ${livre.statut === "Disponible" ? "bs-green" : "bs-amber"}`}>{livre.statut}</div>
                                            </div>
                                            <div className="book-card-body">
                                                <div className="bc-title">{livre.titre}</div>
                                                <div className="bc-author">{livre.auteur}</div>
                                                <div className="bc-genre">{livre.genre}</div>
                                                <div className="bc-footer">
                                                    <div className="bc-owner">
                                                        <div className="bc-av" style={{ background: propCouleur, color: propTexte }}>{ini}</div>
                                                        <div className="bc-name">{livre.proprietaire_nom}</div>
                                                    </div>
                                                </div>
                                                <button className="ask-btn" onClick={() => navigate("/messages")}>Demander</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explorer;