import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="db">

            {/* ── SIDEBAR ── */}
            <aside className="sidebar">
                <div className="logo-area">
                    <div className="logo-title">Atero ka Alao</div>
                    <div className="logo-sub">Échange de livres</div>
                </div>

                <div className="nav-section">
                    <div className="nav-label">Menu</div>
                    <div className="nav-item active">
                        <i className="fa-solid fa-house"></i> Accueil
                    </div>
                    <div className="nav-item">
                        <i className="fa-solid fa-book"></i> Mes livres
                        <span className="badge">4</span>
                    </div>
                    <div className="nav-item">
                        <i className="fa-solid fa-message"></i> Messages
                        <span className="badge">3</span>
                    </div>
                    <div className="nav-item">
                        <i className="fa-solid fa-magnifying-glass"></i> Explorer
                    </div>
                    <div className="nav-item">
                        <i className="fa-solid fa-heart"></i> Favoris
                    </div>

                    <div className="nav-label" style={{ marginTop: "20px" }}>Compte</div>
                    <div className="nav-item">
                        <i className="fa-solid fa-user"></i> Mon profil
                    </div>
                    <div className="nav-item">
                        <i className="fa-solid fa-gear"></i> Paramètres
                    </div>
                    <div className="nav-item">
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
            </aside>

            {/* ── MAIN ── */}
            <div className="db-main">

                {/* Topbar */}
                <div className="topbar">
                    <div>
                        <div className="welcome-date">Jeudi 2 avril 2026</div>
                        <div className="welcome-title">
                            Bienvenue sur <span>Atero ka Alao</span> ! 👋
                        </div>
                    </div>
                    <div className="topbar-right">
                        <input
                            className="search-box"
                            type="text"
                            placeholder="Rechercher un livre..."
                        />
                        <div className="avatar-circle">JD</div>
                    </div>
                </div>

                {/* Contenu */}
                <div className="db-content">

                    {/* Stats */}
                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-val">4</div>
                            <div className="stat-lbl">Livres déposés</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-val">7</div>
                            <div className="stat-lbl">Échanges réalisés</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-val">142</div>
                            <div className="stat-lbl">Membres actifs</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-val">12</div>
                            <div className="stat-lbl">En favoris</div>
                        </div>
                    </div>

                    {/* Livres + Messages */}
                    <div className="two-col">
                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Mes livres déposés</span>
                                <span className="card-action">+ Déposer un livre</span>
                            </div>
                            <div className="book-row">
                                <span className="book-title">Le Petit Prince</span>
                                <span className="book-badge badge-green">Disponible</span>
                            </div>
                            <div className="book-row">
                                <span className="book-title">L'Alchimiste</span>
                                <span className="book-badge badge-amber">En échange</span>
                            </div>
                            <div className="book-row">
                                <span className="book-title">1984</span>
                                <span className="book-badge badge-green">Disponible</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Messages récents</span>
                                <span className="card-action">Voir tout</span>
                            </div>
                            <div className="chat-row">
                                <div className="avatar-circle small">MR</div>
                                <div>
                                    <div className="chat-name">Marie Rakoto</div>
                                    <div className="chat-preview">Est-ce que le livre est dispo ?</div>
                                </div>
                            </div>
                            <div className="chat-row">
                                <div className="avatar-circle small">TA</div>
                                <div>
                                    <div className="chat-name">Tiana Andriantsoa</div>
                                    <div className="chat-preview">Merci pour l'échange !</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;