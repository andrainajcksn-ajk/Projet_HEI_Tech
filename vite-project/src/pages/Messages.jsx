import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/messages.css";

const conversations = [
    {
        id: 1,
        nom: "Marie Rakoto",
        initiales: "MR",
        couleur: "#DCFCE7",
        texte: "#166534",
        apercu: "Est-ce que le livre est encore dispo ?",
        heure: "10:24",
        nonLus: 2,
        enLigne: true,
    },
    {
        id: 2,
        nom: "Tiana Andriantsoa",
        initiales: "TA",
        couleur: "#DBEAFE",
        texte: "#1e40af",
        apercu: "Merci pour l'échange !",
        heure: "Hier",
        nonLus: 1,
        enLigne: true,
    },
    {
        id: 3,
        nom: "Jean Rabe",
        initiales: "JR",
        couleur: "#FEF9C3",
        texte: "#854d0e",
        apercu: "Je suis intéressé par 1984",
        heure: "Lun.",
        nonLus: 0,
        enLigne: false,
    },
    {
        id: 4,
        nom: "Soa Vola",
        initiales: "SV",
        couleur: "#FCE7F3",
        texte: "#9d174d",
        apercu: "On peut se retrouver samedi ?",
        heure: "Dim.",
        nonLus: 0,
        enLigne: false,
    },
    {
        id: 5,
        nom: "Haja Mamy",
        initiales: "HM",
        couleur: "#EDE9FE",
        texte: "#5b21b6",
        apercu: "Tu as d'autres livres à proposer ?",
        heure: "Sam.",
        nonLus: 0,
        enLigne: false,
    },
];

const messagesParConv = {
    1: [
        { id: 1, auteur: "autre", texte: "Bonjour ! Je voulais vous demander...", heure: "10:20" },
        { id: 2, auteur: "autre", texte: "Est-ce que Le Petit Prince est encore disponible ?", heure: "10:20" },
        { id: 3, auteur: "moi", texte: "Bonjour Marie ! Oui il est toujours disponible 😊", heure: "10:22" },
        { id: 4, auteur: "moi", texte: "Vous souhaitez l'échanger contre quoi ?", heure: "10:22" },
        { id: 5, auteur: "autre", texte: "Super ! J'ai L'Alchimiste à proposer en échange, ça vous intéresse ?", heure: "10:24" },
    ],
    2: [
        { id: 1, auteur: "moi", texte: "Bonjour Tiana, le livre vous a plu ?", heure: "Hier" },
        { id: 2, auteur: "autre", texte: "Merci pour l'échange !", heure: "Hier" },
    ],
    3: [
        { id: 1, auteur: "autre", texte: "Je suis intéressé par 1984", heure: "Lun." },
    ],
    4: [
        { id: 1, auteur: "autre", texte: "On peut se retrouver samedi ?", heure: "Dim." },
    ],
    5: [
        { id: 1, auteur: "autre", texte: "Tu as d'autres livres à proposer ?", heure: "Sam." },
    ],
};

function Messages() {
    const navigate = useNavigate();
    const [convActive, setConvActive] = useState(conversations[0]);
    const [nouveauMsg, setNouveauMsg] = useState("");
    const [messages, setMessages] = useState(messagesParConv);
    const [recherche, setRecherche] = useState("");

    const convsFiltrees = conversations.filter((c) =>
        c.nom.toLowerCase().includes(recherche.toLowerCase())
    );

    const envoyerMessage = () => {
        if (!nouveauMsg.trim()) return;
        const msg = {
            id: Date.now(),
            auteur: "moi",
            texte: nouveauMsg,
            heure: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => ({
            ...prev,
            [convActive.id]: [...(prev[convActive.id] || []), msg],
        }));
        setNouveauMsg("");
    };

    const gererTouche = (e) => {
        if (e.key === "Enter") envoyerMessage();
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
                    <div className="nav-item" onClick={() => navigate("/meslivres")}>
                        <i className="fa-solid fa-book"></i> Mes livres
                        <span className="badge">4</span>
                    </div>
                    <div className="nav-item active" onClick={() => navigate("/messages")}>
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
                <div className="sidebar-footer" onClick={() => navigate("/profil")}>
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
                            {convsFiltrees.map((conv) => (
                                <div
                                    key={conv.id}
                                    className={`conv-item ${convActive.id === conv.id ? "active" : ""}`}
                                    onClick={() => setConvActive(conv)}
                                >
                                    <div className="conv-av" style={{ background: conv.couleur, color: conv.texte }}>
                                        {conv.initiales}
                                        {conv.enLigne && <div className="online-dot"></div>}
                                    </div>
                                    <div className="conv-info">
                                        <div className="conv-name">{conv.nom}</div>
                                        <div className="conv-preview">{conv.apercu}</div>
                                    </div>
                                    <div className="conv-meta">
                                        <div className="conv-time">{conv.heure}</div>
                                        {conv.nonLus > 0 && (
                                            <div className="unread-badge">{conv.nonLus}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chat-panel">
                        <div className="chat-topbar">
                            <div className="chat-av-lg" style={{ background: convActive.couleur, color: convActive.texte }}>
                                {convActive.initiales}
                                {convActive.enLigne && <div className="online-dot"></div>}
                            </div>
                            <div>
                                <div className="chat-user-name">{convActive.nom}</div>
                                <div className="chat-user-status">
                                    {convActive.enLigne ? "En ligne" : "Hors ligne"}
                                </div>
                            </div>
                            <div className="chat-actions">
                                <button className="chat-btn">
                                    <i className="fa-solid fa-phone"></i>
                                </button>
                                <button className="chat-btn">
                                    <i className="fa-solid fa-circle-info"></i>
                                </button>
                            </div>
                        </div>

                        <div className="chat-messages">
                            <div className="msg-day">Aujourd'hui</div>
                            {(messages[convActive.id] || []).map((msg) => (
                                <div key={msg.id} className={`msg-group ${msg.auteur === "moi" ? "me" : ""}`}>
                                    <div
                                        className="msg-av-sm"
                                        style={
                                            msg.auteur === "moi"
                                                ? { background: "#FACC15", color: "#7C3F00" }
                                                : { background: convActive.couleur, color: convActive.texte }
                                        }
                                    >
                                        {msg.auteur === "moi" ? "JD" : convActive.initiales}
                                    </div>
                                    <div className="msg-bubbles">
                                        <div className={`bubble ${msg.auteur === "moi" ? "me" : "other"}`}>
                                            {msg.texte}
                                        </div>
                                        <div className="msg-time">{msg.heure}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="chat-input-area">
                            <button className="input-btn">
                                <i className="fa-solid fa-paperclip"></i>
                            </button>
                            <input
                                className="chat-input"
                                type="text"
                                placeholder="Écrire un message..."
                                value={nouveauMsg}
                                onChange={(e) => setNouveauMsg(e.target.value)}
                                onKeyDown={gererTouche}
                            />
                            <button className="input-btn">
                                <i className="fa-regular fa-face-smile"></i>
                            </button>
                            <button className="send-btn" onClick={envoyerMessage}>
                                <i className="fa-solid fa-paper-plane" style={{ color: "#fff", fontSize: "14px" }}></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Messages;