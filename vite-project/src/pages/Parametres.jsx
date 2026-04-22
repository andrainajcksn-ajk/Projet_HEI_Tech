import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfil, updateProfil, getInitiales } from "../api";
import "../styles/parametres.css";

function Parametres() {
    const navigate = useNavigate();
    const [sectionActive, setSectionActive] = useState("compte");
    const [utilisateur, setUtilisateur] = useState(null);
    const [nom, setNom] = useState("");
    const [ville, setVille] = useState("");
    const [bio, setBio] = useState("");
    const [genrePrefere, setGenrePrefere] = useState("");
    const [succes, setSucces] = useState("");
    const [initiales, setInitiales] = useState("??");
    const [notifs, setNotifs] = useState({ messages: true, echanges: true, livres: false, emails: false });
    const [doubleAuth, setDoubleAuth] = useState(false);
    const [theme, setTheme] = useState("Clair");
    const [langue, setLangue] = useState("Français");

    const seDeconnecter = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        navigate("/");
    };

    const sections = [
        { id: "compte", label: "Compte", icone: "fa-user", bg: "#DCFCE7", color: "#166534" },
        { id: "notifications", label: "Notifications", icone: "fa-bell", bg: "#DBEAFE", color: "#1e40af" },
        { id: "securite", label: "Sécurité", icone: "fa-lock", bg: "#FEF9C3", color: "#854d0e" },
        { id: "apparence", label: "Apparence", icone: "fa-palette", bg: "#EDE9FE", color: "#5b21b6" },
        { id: "danger", label: "Zone de danger", icone: "fa-triangle-exclamation", bg: "#FEE2E2", color: "#991b1b" },
    ];

    useEffect(() => {
        const charger = async () => {
            try {
                const res = await getProfil();
                setUtilisateur(res.data);
                setNom(res.data.nom || "");
                setVille(res.data.ville || "");
                setBio(res.data.bio || "");
                setGenrePrefere(res.data.genre_prefere || "");
                setInitiales(getInitiales(res.data.nom));
            } catch (err) {
                navigate("/login");
            }
        };
        charger();
    }, []);

    const enregistrer = async () => {
        try {
            await updateProfil({ nom, ville, bio, genre_prefere: genrePrefere });
            const u = JSON.parse(localStorage.getItem("utilisateur") || "{}");
            localStorage.setItem("utilisateur", JSON.stringify({ ...u, nom, ville }));
            setInitiales(getInitiales(nom));
            setSucces("Modifications enregistrées !");
            setTimeout(() => setSucces(""), 3000);
        } catch (err) {
            console.error("Erreur mise à jour profil", err);
        }
    };

    const toggleNotif = (key) => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

    if (!utilisateur) return (
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
                    <div className="nav-item" onClick={() => navigate("/favoris")}><i className="fa-solid fa-heart"></i> Favoris</div>
                    <div className="nav-label" style={{ marginTop: "20px" }}>Compte</div>
                    <div className="nav-item" onClick={() => navigate("/profil")}><i className="fa-solid fa-user"></i> Mon profil</div>
                    <div className="nav-item active"><i className="fa-solid fa-gear"></i> Paramètres</div>
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
                    <div className="topbar-title">Paramètres</div>
                    <div className="topbar-sub">Gérez vos préférences et votre compte</div>
                </div>

                <div className="param-body">
                    <div className="param-nav">
                        {sections.map((s) => (
                            <div key={s.id} className={`param-nav-item ${sectionActive === s.id ? "active" : ""}`} onClick={() => setSectionActive(s.id)}>
                                <div className="param-nav-icon" style={{ background: s.bg, color: s.color }}>
                                    <i className={`fa-solid ${s.icone}`}></i>
                                </div>
                                {s.label}
                            </div>
                        ))}
                    </div>

                    <div className="param-content">

                        {sectionActive === "compte" && (
                            <div className="section-card">
                                <div className="section-head">
                                    <div className="section-head-icon" style={{ background: "#DCFCE7" }}><i className="fa-solid fa-user" style={{ color: "#166534" }}></i></div>
                                    <div><div className="section-head-title">Informations du compte</div><div className="section-head-sub">Modifiez vos informations personnelles</div></div>
                                </div>
                                <div className="avatar-row">
                                    <div className="big-avatar">{initiales}</div>
                                    <div>
                                        <div className="setting-label">{utilisateur.nom}</div>
                                        <div className="setting-desc">Photo de profil · JPG ou PNG, max 2MB</div>
                                        <div className="avatar-btns">
                                            <button className="setting-btn btn-green">Changer la photo</button>
                                            <button className="setting-btn btn-gray">Supprimer</button>
                                        </div>
                                    </div>
                                </div>
                                {succes && <div style={{ margin: "0 20px", padding: "10px 14px", background: "#DCFCE7", color: "#166534", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>{succes}</div>}
                                <div className="setting-row">
                                    <div><div className="setting-label">Nom complet</div><div className="setting-desc">Visible par les autres membres</div></div>
                                    <input className="setting-input" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Email</div><div className="setting-desc">{utilisateur.email}</div></div>
                                    <button className="setting-btn btn-gray">Modifier</button>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Ville</div><div className="setting-desc">Votre localisation</div></div>
                                    <input className="setting-input" type="text" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ex: Antananarivo" />
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Genre préféré</div><div className="setting-desc">Vos genres littéraires favoris</div></div>
                                    <input className="setting-input" type="text" value={genrePrefere} onChange={(e) => setGenrePrefere(e.target.value)} placeholder="Ex: Roman, Science-fiction" />
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Bio</div><div className="setting-desc">Présentez-vous à la communauté</div></div>
                                    <input className="setting-input" type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Quelques mots sur vous..." />
                                </div>
                                <div className="setting-row">
                                    <div></div>
                                    <button className="setting-btn btn-green" onClick={enregistrer}>
                                        <i className="fa-solid fa-check"></i> Enregistrer
                                    </button>
                                </div>
                            </div>
                        )}

                        {sectionActive === "notifications" && (
                            <div className="section-card">
                                <div className="section-head">
                                    <div className="section-head-icon" style={{ background: "#DBEAFE" }}><i className="fa-solid fa-bell" style={{ color: "#1e40af" }}></i></div>
                                    <div><div className="section-head-title">Notifications</div><div className="section-head-sub">Choisissez ce que vous souhaitez recevoir</div></div>
                                </div>
                                {[
                                    { key: "messages", label: "Nouveaux messages", desc: "Notification quand quelqu'un vous écrit" },
                                    { key: "echanges", label: "Demandes d'échange", desc: "Notification quand un livre est demandé" },
                                    { key: "livres", label: "Nouveaux livres près de moi", desc: "Suggestions dans votre zone" },
                                    { key: "emails", label: "Emails de la communauté", desc: "Actualités de la plateforme" },
                                ].map((item) => (
                                    <div key={item.key} className="setting-row">
                                        <div><div className="setting-label">{item.label}</div><div className="setting-desc">{item.desc}</div></div>
                                        <div className={`toggle ${notifs[item.key] ? "on" : ""}`} onClick={() => toggleNotif(item.key)}>
                                            <div className="toggle-dot"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {sectionActive === "securite" && (
                            <div className="section-card">
                                <div className="section-head">
                                    <div className="section-head-icon" style={{ background: "#FEF9C3" }}><i className="fa-solid fa-lock" style={{ color: "#854d0e" }}></i></div>
                                    <div><div className="section-head-title">Sécurité</div><div className="section-head-sub">Protégez votre compte</div></div>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Mot de passe</div><div className="setting-desc">Changez votre mot de passe</div></div>
                                    <button className="setting-btn btn-gray">Changer</button>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Double authentification</div><div className="setting-desc">Sécurité renforcée pour votre compte</div></div>
                                    <div className={`toggle ${doubleAuth ? "on" : ""}`} onClick={() => setDoubleAuth(!doubleAuth)}>
                                        <div className="toggle-dot"></div>
                                    </div>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Sessions actives</div><div className="setting-desc">1 session — Navigateur actuel</div></div>
                                    <button className="setting-btn btn-red" onClick={seDeconnecter}>Déconnecter tout</button>
                                </div>
                            </div>
                        )}

                        {sectionActive === "apparence" && (
                            <div className="section-card">
                                <div className="section-head">
                                    <div className="section-head-icon" style={{ background: "#EDE9FE" }}><i className="fa-solid fa-palette" style={{ color: "#5b21b6" }}></i></div>
                                    <div><div className="section-head-title">Apparence</div><div className="section-head-sub">Personnalisez l'interface</div></div>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Thème</div><div className="setting-desc">Clair, sombre ou automatique</div></div>
                                    <select className="setting-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                                        <option>Clair</option><option>Sombre</option><option>Automatique</option>
                                    </select>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Langue</div><div className="setting-desc">Langue de l'interface</div></div>
                                    <select className="setting-select" value={langue} onChange={(e) => setLangue(e.target.value)}>
                                        <option>Français</option><option>English</option><option>Malagasy</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {sectionActive === "danger" && (
                            <div className="danger-zone">
                                <div className="danger-head">
                                    <div className="danger-title"><i className="fa-solid fa-triangle-exclamation"></i> Zone de danger</div>
                                    <div className="danger-sub">Ces actions sont irréversibles, soyez prudent</div>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Désactiver mon compte</div><div className="setting-desc">Votre compte sera suspendu temporairement</div></div>
                                    <button className="setting-btn btn-red">Désactiver</button>
                                </div>
                                <div className="setting-row">
                                    <div><div className="setting-label">Supprimer mon compte</div><div className="setting-desc">Toutes vos données seront définitivement supprimées</div></div>
                                    <button className="setting-btn btn-red">Supprimer</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Parametres;