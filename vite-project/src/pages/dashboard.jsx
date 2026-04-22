import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMesLivres, getConversations, getInitiales } from "../api";
import "../styles/dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [utilisateur, setUtilisateur] = useState(null);
    const [initiales, setInitiales] = useState("??");
    const [livres, setLivres] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    const couleursBadge = {
        "Disponible": "badge-green",
        "En échange": "badge-amber",
        "Prêté": "badge-blue",
    };

    const COULEURS = ["#DCFCE7", "#DBEAFE", "#FEF9C3", "#FCE7F3", "#EDE9FE"];
    const TEXTES = ["#166534", "#1e40af", "#854d0e", "#9d174d", "#5b21b6"];

    const seDeconnecter = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        navigate("/");
    };

    useEffect(() => {
        const u = localStorage.getItem("utilisateur");
        if (!u) { navigate("/login"); return; }
        const userData = JSON.parse(u);
        setUtilisateur(userData);
        setInitiales(getInitiales(userData.nom));

        const charger = async () => {
            try {
                const [livresRes, convsRes] = await Promise.all([
                    getMesLivres(),
                    getConversations(),
                ]);
                setLivres(livresRes.data.slice(0, 3));
                setConversations(convsRes.data.slice(0, 2));
            } catch (err) {
                console.error("Erreur chargement dashboard", err);
            } finally {
                setLoading(false);
            }
        };
        charger();
    }, []);

    if (!utilisateur) return null;

    return (
        <div className="db">
            <div className="sidebar">
                <div className="logo-area">
                    <div className="logo-title">Atero ka Alao</div>
                    <div className="logo-sub">Échange de livres</div>
                </div>
                <div className="nav-section">
                    <div className="nav-label">Menu</div>
                    <div className="nav-item active">
                        <i className="fa-solid fa-house"></i> Accueil
                    </div>
                    <div className="nav-item" onClick={() => navigate("/meslivres")}>
                        <i className="fa-solid fa-book"></i> Mes livres
                        {livres.length > 0 && <span className="badge">{livres.length}</span>}
                    </div>
                    <div className="nav-item" onClick={() => navigate("/messages")}>
                        <i className="fa-solid fa-message"></i> Messages
                        {conversations.length > 0 && <span className="badge">{conversations.length}</span>}
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
                        <div className="welcome-date">
                            {new Date().toLocaleDateString("fr-FR", {
                                weekday: "long", day: "numeric",
                                month: "long", year: "numeric"
                            })}
                        </div>
                        <div className="welcome-title">
                            Bienvenue, <span>{utilisateur.nom}</span> ! 👋
                        </div>
                    </div>
                    <div className="topbar-right">
                        <input
                            className="search-box"
                            type="text"
                            placeholder="Rechercher un livre..."
                            onKeyDown={(e) => { if (e.key === "Enter") navigate("/explorer"); }}
                        />
                        <div className="avatar-circle" onClick={() => navigate("/profil")}>
                            {initiales}
                        </div>
                    </div>
                </div>

                <div className="db-content">
                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-val">{livres.length}</div>
                            <div className="stat-lbl">Livres déposés</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-val">0</div>
                            <div className="stat-lbl">Échanges réalisés</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-val">—</div>
                            <div className="stat-lbl">Membres actifs</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-val">0</div>
                            <div className="stat-lbl">En favoris</div>
                        </div>
                    </div>

                    <div className="two-col">
                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Mes livres déposés</span>
                                <span className="card-action" onClick={() => navigate("/meslivres")}>
                                    + Déposer un livre
                                </span>
                            </div>
                            {loading ? (
                                <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                                    Chargement...
                                </div>
                            ) : livres.length === 0 ? (
                                <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                                    Aucun livre déposé pour l'instant.
                                </div>
                            ) : (
                                livres.map((livre) => (
                                    <div key={livre.id} className="book-row">
                                        <span className="book-title">{livre.titre}</span>
                                        <span className={`book-badge ${couleursBadge[livre.statut] || "badge-green"}`}>
                                            {livre.statut}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Messages récents</span>
                                <span className="card-action" onClick={() => navigate("/messages")}>
                                    Voir tout
                                </span>
                            </div>
                            {loading ? (
                                <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                                    Chargement...
                                </div>
                            ) : conversations.length === 0 ? (
                                <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                                    Aucun message pour l'instant.
                                </div>
                            ) : (
                                conversations.map((conv, index) => {
                                    const nom = conv.interlocuteur_nom || "Utilisateur";
                                    const ini = getInitiales(nom);
                                    const couleur = COULEURS[index % COULEURS.length];
                                    const texte = TEXTES[index % TEXTES.length];
                                    return (
                                        <div key={conv.id} className="chat-row" onClick={() => navigate("/messages")}>
                                            <div className="avatar-circle small" style={{ background: couleur, color: texte }}>
                                                {ini}
                                            </div>
                                            <div>
                                                <div className="chat-name">{nom}</div>
                                                <div className="chat-preview">{conv.contenu}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;