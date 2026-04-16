import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/explorer.css";

const tousLesLivres = [
    { id: 1, titre: "Le Comte de Monte-Cristo", auteur: "Alexandre Dumas", genre: "Roman", couleur: "#DCFCE7", emoji: "📗", proprietaire: "Haja M.", initiales: "HM", couleurAv: "#DCFCE7", texteAv: "#166534", distance: "0,3 km", statut: "Disponible" },
    { id: 2, titre: "Madame Bovary", auteur: "Gustave Flaubert", genre: "Roman", couleur: "#DBEAFE", emoji: "📘", proprietaire: "Lova R.", initiales: "LR", couleurAv: "#DBEAFE", texteAv: "#1e40af", distance: "1,2 km", statut: "Disponible" },
    { id: 3, titre: "Harry Potter T.1", auteur: "J.K. Rowling", genre: "Jeunesse", couleur: "#FEF9C3", emoji: "📙", proprietaire: "Noro F.", initiales: "NF", couleurAv: "#FEF9C3", texteAv: "#854d0e", distance: "2 km", statut: "En échange" },
    { id: 4, titre: "Les Fleurs du Mal", auteur: "Charles Baudelaire", genre: "Poésie", couleur: "#FCE7F3", emoji: "📕", proprietaire: "Soa V.", initiales: "SV", couleurAv: "#FCE7F3", texteAv: "#9d174d", distance: "2,5 km", statut: "Disponible" },
    { id: 5, titre: "Dune", auteur: "Frank Herbert", genre: "Science-fiction", couleur: "#EDE9FE", emoji: "📔", proprietaire: "Ravo M.", initiales: "RM", couleurAv: "#EDE9FE", texteAv: "#5b21b6", distance: "3,1 km", statut: "Disponible" },
    { id: 6, titre: "L'Étranger", auteur: "Albert Camus", genre: "Roman", couleur: "#FEE2E2", emoji: "📒", proprietaire: "Tojo R.", initiales: "TR", couleurAv: "#FEE2E2", texteAv: "#991b1b", distance: "3,8 km", statut: "En échange" },
    { id: 7, titre: "Sapiens", auteur: "Yuval Noah Harari", genre: "Histoire", couleur: "#DCFCE7", emoji: "📗", proprietaire: "Fara A.", initiales: "FA", couleurAv: "#DCFCE7", texteAv: "#166534", distance: "4,2 km", statut: "Disponible" },
    { id: 8, titre: "Le Seigneur des Anneaux", auteur: "J.R.R. Tolkien", genre: "Roman", couleur: "#DBEAFE", emoji: "📘", proprietaire: "Mino R.", initiales: "MR", couleurAv: "#DBEAFE", texteAv: "#1e40af", distance: "4,9 km", statut: "Disponible" },
    { id: 9, titre: "Le Prophète", auteur: "Khalil Gibran", genre: "Poésie", couleur: "#FEF9C3", emoji: "📙", proprietaire: "Anja S.", initiales: "AS", couleurAv: "#FEF9C3", texteAv: "#854d0e", distance: "5,2 km", statut: "Disponible" },
    { id: 10, titre: "Fondation", auteur: "Isaac Asimov", genre: "Science-fiction", couleur: "#EDE9FE", emoji: "📔", proprietaire: "Tina M.", initiales: "TM", couleurAv: "#EDE9FE", texteAv: "#5b21b6", distance: "5,8 km", statut: "Disponible" },
    { id: 11, titre: "Les Misérables", auteur: "Victor Hugo", genre: "Roman", couleur: "#FCE7F3", emoji: "📕", proprietaire: "Dina R.", initiales: "DR", couleurAv: "#FCE7F3", texteAv: "#9d174d", distance: "6,1 km", statut: "En échange" },
    { id: 12, titre: "L'Art de la Guerre", auteur: "Sun Tzu", genre: "Développement", couleur: "#FEE2E2", emoji: "📒", proprietaire: "Hery B.", initiales: "HB", couleurAv: "#FEE2E2", texteAv: "#991b1b", distance: "6,5 km", statut: "Disponible" },
];

const genres = ["Tous", "Roman", "Science-fiction", "Jeunesse", "Histoire", "Développement", "Poésie"];
const statuts = ["Tous", "Disponible", "En échange"];

function Explorer() {
    const navigate = useNavigate();
    const [recherche, setRecherche] = useState("");
    const [genreActif, setGenreActif] = useState("Tous");
    const [statutActif, setStatutActif] = useState("Tous");
    const [tri, setTri] = useState("Récents");

    const livresFiltres = tousLesLivres.filter((livre) => {
        const matchRecherche =
            livre.titre.toLowerCase().includes(recherche.toLowerCase()) ||
            livre.auteur.toLowerCase().includes(recherche.toLowerCase()) ||
            livre.genre.toLowerCase().includes(recherche.toLowerCase());
        const matchGenre = genreActif === "Tous" || livre.genre === genreActif;
        const matchStatut = statutActif === "Tous" || livre.statut === statutActif;
        return matchRecherche && matchGenre && matchStatut;
    });

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
                    <div className="nav-item" onClick={() => navigate("/messages")}>
                        <i className="fa-solid fa-message"></i> Messages
                        <span className="badge">3</span>
                    </div>
                    <div className="nav-item active" onClick={() => navigate("/explorer")}>
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
                    <div className="topbar-title">Explorer les livres</div>
                    <div className="topbar-sub">
                        Découvrez les livres disponibles près de chez vous
                    </div>
                </div>

                <div className="explorer-body">

                    <div className="filters-panel">
                        <div>
                            <div className="filter-title">Genres</div>
                            <div className="filter-group">
                                {genres.map((genre) => (
                                    <div
                                        key={genre}
                                        className={`filter-item ${genreActif === genre ? "active" : ""}`}
                                        onClick={() => setGenreActif(genre)}
                                    >
                                        <div className="filter-check">
                                            {genreActif === genre ? "✓" : ""}
                                        </div>
                                        {genre}
                                        <span className="filter-count">
                                            {genre === "Tous"
                                                ? tousLesLivres.length
                                                : tousLesLivres.filter((l) => l.genre === genre).length}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="filter-sep"></div>

                        <div>
                            <div className="filter-title">Disponibilité</div>
                            <div className="filter-group">
                                {statuts.map((statut) => (
                                    <div
                                        key={statut}
                                        className={`filter-item ${statutActif === statut ? "active" : ""}`}
                                        onClick={() => setStatutActif(statut)}
                                    >
                                        <div className="filter-check">
                                            {statutActif === statut ? "✓" : ""}
                                        </div>
                                        {statut}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="filter-sep"></div>

                        <div>
                            <div className="filter-title">État du livre</div>
                            <div className="filter-group">
                                {["Très bon état", "Bon état", "État correct"].map((etat) => (
                                    <div key={etat} className="filter-item">
                                        <div className="filter-check"></div>
                                        {etat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="books-area">
                        <div className="search-bar">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Rechercher un titre, auteur, genre..."
                                value={recherche}
                                onChange={(e) => setRecherche(e.target.value)}
                            />
                            <select
                                className="sort-select"
                                value={tri}
                                onChange={(e) => setTri(e.target.value)}
                            >
                                <option>Récents</option>
                                <option>Distance</option>
                                <option>Popularité</option>
                            </select>
                        </div>

                        <div className="results-info">
                            <span>{livresFiltres.length} livres</span> trouvés
                        </div>

                        {livresFiltres.length === 0 ? (
                            <div className="no-results">
                                <div className="no-results-icon">📭</div>
                                <div className="no-results-text">Aucun livre trouvé</div>
                                <div className="no-results-sub">Essayez un autre terme de recherche</div>
                            </div>
                        ) : (
                            <div className="books-grid">
                                {livresFiltres.map((livre) => (
                                    <div key={livre.id} className="book-card">
                                        <div className="book-cover-area" style={{ background: livre.couleur }}>
                                            <span className="book-emoji">{livre.emoji}</span>
                                            <div className={`book-status ${livre.statut === "Disponible" ? "bs-green" : "bs-amber"}`}>
                                                {livre.statut}
                                            </div>
                                        </div>
                                        <div className="book-card-body">
                                            <div className="bc-title">{livre.titre}</div>
                                            <div className="bc-author">{livre.auteur}</div>
                                            <div className="bc-genre">{livre.genre}</div>
                                            <div className="bc-footer">
                                                <div className="bc-owner">
                                                    <div className="bc-av" style={{ background: livre.couleurAv, color: livre.texteAv }}>
                                                        {livre.initiales}
                                                    </div>
                                                    <div className="bc-name">{livre.proprietaire}</div>
                                                </div>
                                                <div className="bc-dist">{livre.distance}</div>
                                            </div>
                                            <button
                                                className="ask-btn"
                                                onClick={() => navigate("/messages")}
                                            >
                                                Demander
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Explorer;