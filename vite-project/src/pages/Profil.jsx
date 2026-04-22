import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfil, getMesLivres, getInitiales } from "../api";
import "../styles/profil.css";

function Profil() {
    const navigate = useNavigate();
    const [utilisateur, setUtilisateur] = useState(null);
    const [livres, setLivres] = useState([]);
    const [initiales, setInitiales] = useState("??");
    const [loading, setLoading] = useState(true);

    const couleursCover = ["#DCFCE7", "#FEF9C3", "#DBEAFE", "#FCE7F3", "#EDE9FE"];
    const couleursBadge = {
        "Disponible": { bg: "#DCFCE7", color: "#166534" },
        "En échange": { bg: "#FEF9C3", color: "#854d0e" },
        "Prêté": { bg: "#DBEAFE", color: "#1e40af" },
    };

    const seDeconnecter = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        navigate("/");
    };

    const formaterDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    };

    useEffect(() => {
        const charger = async () => {
            try {
                const [profilRes, livresRes] = await Promise.all([
                    getProfil(),
                    getMesLivres(),
                ]);
                setUtilisateur(profilRes.data);
                setInitiales(getInitiales(profilRes.data.nom));
                setLivres(livresRes.data.slice(0, 3));
            } catch (err) {
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        charger();
    }, []);

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#355E3B", fontSize: "16px" }}>
            Chargement...
        </div>
    );

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
                    <div className="nav-item" onClick={() => navigate("/dashboard")}>
                        <i className="fa-solid fa-house"></i> Accueil
                    </div>
                    <div className="nav-item" onClick={() => navigate("/meslivres")}>
                        <i className="fa-solid fa-book"></i> Mes livres
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
                    <div className="nav-item active">
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
                        <div className="topbar-title">Mon profil</div>
                        <div className="topbar-sub">Gérez vos informations personnelles</div>
                    </div>
                </div>

                <div className="profil-content">

                    <div className="profile-hero">
                        <div className="hero-banner"></div>
                        <div className="hero-body">
                            <div className="big-avatar">{initiales}</div>
                            <div className="hero-info">
                                <div className="hero-name">{utilisateur.nom}</div>
                                <div className="hero-role">
                                    Membre depuis {formaterDate(utilisateur.date_inscription)}
                                    {utilisateur.ville ? ` · ${utilisateur.ville}` : ""}
                                </div>
                                <div className="hero-actions">
                                    <button className="btn-edit" onClick={() => navigate("/parametres")}>
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
                                <div className="strip-val">{livres.length}</div>
                                <div className="strip-lbl">Livres déposés</div>
                            </div>
                            <div className="strip-stat">
                                <div className="strip-val">0</div>
                                <div className="strip-lbl">Échanges réalisés</div>
                            </div>
                            <div className="strip-stat">
                                <div className="strip-val">—</div>
                                <div className="strip-lbl">Note moyenne</div>
                            </div>
                            <div className="strip-stat">
                                <div className="strip-val">0</div>
                                <div className="strip-lbl">Favoris</div>
                            </div>
                        </div>
                    </div>

                    <div className="two-col">
                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Informations personnelles</span>
                                <span className="card-action" onClick={() => navigate("/parametres")}>Modifier</span>
                            </div>
                            <div className="info-row">
                                <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                                <div>
                                    <div className="info-lbl">Email</div>
                                    <div className="info-val">{utilisateur.email}</div>
                                </div>
                            </div>
                            <div className="info-row">
                                <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                                <div>
                                    <div className="info-lbl">Ville</div>
                                    <div className="info-val">{utilisateur.ville || "Non renseignée"}</div>
                                </div>
                            </div>
                            <div className="info-row">
                                <div className="info-icon"><i className="fa-solid fa-book-open"></i></div>
                                <div>
                                    <div className="info-lbl">Genre préféré</div>
                                    <div className="info-val">{utilisateur.genre_prefere || "Non renseigné"}</div>
                                </div>
                            </div>
                            <div className="info-row">
                                <div className="info-icon"><i className="fa-solid fa-comment"></i></div>
                                <div>
                                    <div className="info-lbl">Bio</div>
                                    <div className="info-val">{utilisateur.bio || "Non renseignée"}</div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-head">
                                <span className="card-title">Mes livres déposés</span>
                                <span className="card-action" onClick={() => navigate("/meslivres")}>Voir tout</span>
                            </div>
                            {livres.length === 0 ? (
                                <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                                    Aucun livre déposé pour l'instant.
                                </div>
                            ) : (
                                livres.map((livre, index) => {
                                    const badge = couleursBadge[livre.statut] || couleursBadge["Disponible"];
                                    const cover = couleursCover[index % couleursCover.length];
                                    return (
                                        <div key={livre.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 20px", borderBottom: index < livres.length - 1 ? "1px solid #f9fafb" : "none" }}>
                                            <div style={{ width: "32px", minWidth: "32px", height: "44px", borderRadius: "5px", background: cover, flexShrink: 0 }}></div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: "13px", fontWeight: 500, color: "#2D2D2D", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{livre.titre}</div>
                                                <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{livre.auteur}</div>
                                            </div>
                                            <span style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "20px", fontWeight: 600, background: badge.bg, color: badge.color, whiteSpace: "nowrap" }}>
                                                {livre.statut}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-head">
                            <span className="card-title">Avis reçus</span>
                            <span className="card-action">0 avis</span>
                        </div>
                        <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                            Aucun avis reçu pour l'instant.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profil;