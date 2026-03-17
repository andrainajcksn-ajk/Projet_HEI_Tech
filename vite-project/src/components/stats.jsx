function Stats() {
    return (
        <section className="stats_column">
            <div className="stats_contain">
                <div className="stats">
                    <i className="fa-solid fa-book" id="font"></i>
                    <p className="stats_text">Divers Livres</p>
                </div>
            </div>

            <div className="stats_contain">
                <div className="stats">
                    <i className="fa-solid fa-people-group" id="font"></i>
                    <p className="stats_text">Communauté très actif</p>
                </div>
            </div>

            <div className="stats_contain">
                <div className="stats">
                    <i className="fa-solid fa-brain" id="font"></i>
                    <p className="stats_text">Monde des connaissances</p>
                </div>
            </div>
        </section>
    );
}

export default Stats;