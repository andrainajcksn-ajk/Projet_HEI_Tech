import { useNavigate } from "react-router-dom";
import "../styles/profil.css";

function Profil() {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                    <div className="nav-item" onClick={() => navigate("/dashboard")}>
                        <i className="fa-solid fa-book"></i> Mes livres
                        <span className="badge">4</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate("/messages")}>
                        <i className="fa-solid fa-message"></i> Messages
                        <span className="badge">3</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate("/dashboard")}>
                        <i className="fa-solid fa-magnifying-glass"></i> Explorer
                    </div>
                    <div className="nav-item" onClick={() => navigate("/dashboard")}>
                        <i className="fa-solid fa-heart"></i> Favoris
                    </div>

                    <div className="nav-label" style={{ marginTop: "20px" }}>Compte</div>
                    <div className="nav-item active">
                        <i className="fa-solid fa-user"></i> Mon profil
                    </div>
                    <div className="nav-item" onClick={() => navigate("/dashboard")}>
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
                        <div className="topbar-title">Mon profil</div>
                        <div className="topbar-sub">Gérez vos informations personnelles</div>
                    </div>
                </div>

                <div className="profil-content">
                    <div className="profile-hero">
                        <div className="hero-banner"></div>
                        <div className="hero-body">
                            <div className="big-avatar">JD</div>
                            <div className="hero-info">
                                <div className="hero-name">Jean Dupont</div>
                                <div className="hero-role">
                                    Membre depuis janvier 2025 · Antananarivo
                                </div>
                                <div className="hero-actions">
                                    <button className="btn-edit">
                                        <i className="fa-solid fa-pen"></i> Modifier le profil
                                    </button>
                                    <button className="btn-share">
                                        <i className="fa-solid fa-share-nodes"></i> Partager
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="stats-strip">
                            <div className="strip-stat">
                                <div className="strip-val">4</div>
                                <div className="strip-lbl">Livres déposés</div>
                            </div>
                            <div className="strip-stat">
                                <div className="strip-val">7</div>
                                <div className="strip-lbl">Échanges réalisés</div>
                            </div>
                            <div className="strip-stat">
                                <div className="strip-val">4.8</div>
                                <div className="strip-lbl">Note moyenne</div>
                            </div>
                            <div className="strip-stat">
                                <div className="strip-val">12</div>
                                <div className="strip-lbl">Favoris</div>
                            </div>
                        </div>
                    </div>

                    <div className="two-col">
                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Informations personnelles</span>
                                <span className="card-action">Modifier</span>
                            </div>
                            <div className="info-row">
                                <div className="info-icon">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <div className="info-lbl">Email</div>
                                    <div className="info-val">jean.dupont@email.com</div>
                                </div>
                            </div>
                            <div className="info-row">
                                <div className="info-icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <div className="info-lbl">Ville</div>
                                    <div className="info-val">Antananarivo, Madagascar</div>
                                </div>
                            </div>
                            <div className="info-row">
                                <div className="info-icon">
                                    <i className="fa-solid fa-book-open"></i>
                                </div>
                                <div>
                                    <div className="info-lbl">Genre préféré</div>
                                    <div className="info-val">Roman, Science-fiction</div>
                                </div>
                            </div>
                            <div className="info-row">
                                <div className="info-icon">
                                    <i className="fa-solid fa-comment"></i>
                                </div>
                                <div>
                                    <div className="info-lbl">Bio</div>
                                    <div className="info-val">Passionné de lecture depuis toujours !</div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Mes livres déposés</span>
                                <span className="card-action">Voir tout</span>
                            </div>
                            <div className="book-row">
                                <div className="book-cover" style={{ background: "#DCFCE7" }}></div>
                                <div className="book-info">
                                    <div className="book-title">Le Petit Prince</div>
                                    <div className="book-author">Antoine de Saint-Exupéry</div>
                                </div>
                                <span className="book-badge badge-green">Disponible</span>
                            </div>
                            <div className="book-row">
                                <div className="book-cover" style={{ background: "#FEF9C3" }}></div>
                                <div className="book-info">
                                    <div className="book-title">L'Alchimiste</div>
                                    <div className="book-author">Paulo Coelho</div>
                                </div>
                                <span className="book-badge badge-amber">En échange</span>
                            </div>
                            <div className="book-row">
                                <div className="book-cover" style={{ background: "#DBEAFE" }}></div>
                                <div className="book-info">
                                    <div className="book-title">1984</div>
                                    <div className="book-author">George Orwell</div>
                                </div>
                                <span className="book-badge badge-green">Disponible</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-head">
                            <span className="card-title">Avis reçus</span>
                            <span className="card-action">3 avis</span>
                        </div>
                        <div className="avis-grid">
                            <div className="avis-row">
                                <div className="avis-top">
                                    <div className="av-sm" style={{ background: "#DCFCE7", color: "#166534" }}>MR</div>
                                    <span className="avis-name">Marie Rakoto</span>
                                    <span className="avis-date">Il y a 2 jours</span>
                                </div>
                                <div className="stars">★★★★★</div>
                                <div className="avis-text">Échange rapide et soigné, livre en parfait état. Je recommande !</div>
                            </div>
                            <div className="avis-row">
                                <div className="avis-top">
                                    <div className="av-sm" style={{ background: "#DBEAFE", color: "#1e40af" }}>TA</div>
                                    <span className="avis-name">Tiana A.</span>
                                    <span className="avis-date">Il y a 1 sem.</span>
                                </div>
                                <div className="stars">★★★★★</div>
                                <div className="avis-text">Très sympa, ponctuel au rendez-vous. Super expérience !</div>
                            </div>
                            <div className="avis-row">
                                <div className="avis-top">
                                    <div className="av-sm" style={{ background: "#FEF9C3", color: "#854d0e" }}>JR</div>
                                    <span className="avis-name">Jean Rabe</span>
                                    <span className="avis-date">Il y a 2 sem.</span>
                                </div>
                                <div className="stars">★★★★☆</div>
                                <div className="avis-text">Bonne communication, livre conforme à la description.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profil;