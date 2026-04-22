import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getConversations, getMessages, envoyerMessage, getInitiales } from "../api";
import "../styles/messages.css";

const COULEURS = ["#DCFCE7", "#DBEAFE", "#FEF9C3", "#FCE7F3", "#EDE9FE", "#FEE2E2"];
const TEXTES = ["#166534", "#1e40af", "#854d0e", "#9d174d", "#5b21b6", "#991b1b"];

function Messages() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [convActive, setConvActive] = useState(null);
    const [messages, setMessages] = useState([]);
    const [nouveauMsg, setNouveauMsg] = useState("");
    const [recherche, setRecherche] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const utilisateur = JSON.parse(localStorage.getItem("utilisateur") || "{}");
    const initMoi = getInitiales(utilisateur.nom);

    const seDeconnecter = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        navigate("/");
    };

    const getCouleur = (id) => COULEURS[id % COULEURS.length];
    const getTexte = (id) => TEXTES[id % TEXTES.length];

    const getInterlocuteur = (conv) => ({
        id: conv.expediteur_id === utilisateur.id ? conv.destinataire_id : conv.expediteur_id,
        nom: conv.interlocuteur_nom || "Utilisateur",
    });

    const formaterHeure = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const diff = new Date() - date;
        if (diff < 86400000) return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        if (diff < 172800000) return "Hier";
        return date.toLocaleDateString("fr-FR", { weekday: "short" });
    };

    useEffect(() => {
        const charger = async () => {
            try {
                const res = await getConversations();
                setConversations(res.data);
                if (res.data.length > 0) setConvActive(res.data[0]);
            } catch (err) {
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        charger();
    }, []);

    useEffect(() => {
        if (!convActive) return;
        const chargerMessages = async () => {
            try {
                const interlocuteur = getInterlocuteur(convActive);
                const res = await getMessages(interlocuteur.id);
                setMessages(res.data);
                setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            } catch (err) {
                console.error("Erreur messages", err);
            }
        };
        chargerMessages();
    }, [convActive]);

    const envoyerMsg = async () => {
        if (!nouveauMsg.trim() || !convActive) return;
        try {
            const interlocuteur = getInterlocuteur(convActive);
            const res = await envoyerMessage({ destinataire_id: interlocuteur.id, contenu: nouveauMsg });
            setMessages((prev) => [...prev, res.data.data]);
            setNouveauMsg("");
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        } catch (err) {
            console.error("Erreur envoi", err);
        }
    };

    const convsFiltrees = conversations.filter((c) =>
        (c.interlocuteur_nom || "").toLowerCase().includes(recherche.toLowerCase())
    );

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
                    <div className="nav-item" onClick={() => navigate("/meslivres")}>
                        <i className="fa-solid fa-book"></i> Mes livres
                    </div>
                    <div className="nav-item active">
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
                        <div className="avatar-circle">{initMoi}</div>
                        <div>
                            <div className="user-name">{utilisateur.nom}</div>
                            <div className="user-status">En ligne</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="db-main">
                <div className="chat-layout">
                    <div className="conv-panel">
                        <div className="conv-head">
                            <div className="conv-title">Messages</div>
                            <input
                                className="search-conv"
                                type="text"
                                placeholder="Rechercher..."
                                value={recherche}
                                onChange={(e) => setRecherche(e.target.value)}
                            />
                        </div>
                        <div className="conv-list">
                            {convsFiltrees.length === 0 ? (
                                <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                                    Aucune conversation
                                </div>
                            ) : (
                                convsFiltrees.map((conv) => {
                                    const interlocuteur = getInterlocuteur(conv);
                                    const ini = getInitiales(interlocuteur.nom);
                                    return (
                                        <div
                                            key={conv.id}
                                            className={`conv-item ${convActive?.id === conv.id ? "active" : ""}`}
                                            onClick={() => setConvActive(conv)}
                                        >
                                            <div className="conv-av" style={{ background: getCouleur(interlocuteur.id), color: getTexte(interlocuteur.id) }}>
                                                {ini}
                                            </div>
                                            <div className="conv-info">
                                                <div className="conv-name">{interlocuteur.nom}</div>
                                                <div className="conv-preview">{conv.contenu}</div>
                                            </div>
                                            <div className="conv-meta">
                                                <div className="conv-time">{formaterHeure(conv.date_envoi)}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="chat-panel">
                        {!convActive ? (
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: "14px" }}>
                                Sélectionnez une conversation
                            </div>
                        ) : (
                            <>
                                <div className="chat-topbar">
                                    {(() => {
                                        const interlocuteur = getInterlocuteur(convActive);
                                        return (
                                            <>
                                                <div className="chat-av-lg" style={{ background: getCouleur(interlocuteur.id), color: getTexte(interlocuteur.id) }}>
                                                    {getInitiales(interlocuteur.nom)}
                                                </div>
                                                <div>
                                                    <div className="chat-user-name">{interlocuteur.nom}</div>
                                                    <div className="chat-user-status">En ligne</div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                    <div className="chat-actions">
                                        <button className="chat-btn"><i className="fa-solid fa-phone"></i></button>
                                        <button className="chat-btn"><i className="fa-solid fa-circle-info"></i></button>
                                    </div>
                                </div>

                                <div className="chat-messages">
                                    <div className="msg-day">
                                        {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                                    </div>
                                    {messages.map((msg) => {
                                        const estMoi = msg.expediteur_id === utilisateur.id;
                                        return (
                                            <div key={msg.id} className={`msg-group ${estMoi ? "me" : ""}`}>
                                                <div className="msg-av-sm" style={estMoi ? { background: "#FACC15", color: "#7C3F00" } : { background: getCouleur(msg.expediteur_id), color: getTexte(msg.expediteur_id) }}>
                                                    {estMoi ? initMoi : getInitiales(msg.expediteur_nom)}
                                                </div>
                                                <div className="msg-bubbles">
                                                    <div className={`bubble ${estMoi ? "me" : "other"}`}>{msg.contenu}</div>
                                                    <div className="msg-time">{formaterHeure(msg.date_envoi)}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef}></div>
                                </div>

                                <div className="chat-input-area">
                                    <button className="input-btn"><i className="fa-solid fa-paperclip"></i></button>
                                    <input
                                        className="chat-input"
                                        type="text"
                                        placeholder="Écrire un message..."
                                        value={nouveauMsg}
                                        onChange={(e) => setNouveauMsg(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") envoyerMsg(); }}
                                    />
                                    <button className="input-btn"><i className="fa-regular fa-face-smile"></i></button>
                                    <button className="send-btn" onClick={envoyerMsg}>
                                        <i className="fa-solid fa-paper-plane" style={{ color: "#fff", fontSize: "14px" }}></i>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;