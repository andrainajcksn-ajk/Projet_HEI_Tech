function About() {
    return (
        <section className="section_propos" id="propos">
            <div className="propos_image">
                <img className="img_propos_corps" src="/Images/Biblio_Heart.jpg" alt="" />
                <img className="img_propos_corps" src="/Images/Femme_lire.jpg" alt="" />
                <img className="img_propos_corps" src="/Images/Hands.jpg" alt="" />
                <img className="img_propos_corps" src="/Images/Heart_hands.jpg" alt="" />
            </div>

            <div className="text_pro">
                <h3 className="title_propos">Qui sommes-nous ?</h3>

                <p className="propos_text">
                    Notre plateforme est née d’une idée simple : donner une seconde vie aux livres et
                    les rendre accessibles à tous. Nous mettons en relation des lecteurs qui souhaitent partager, échanger,
                    prêter ou récupérer des livres directement entre individus.

                    Que vous soyez passionné de lecture, étudiant ou simplement curieux, notre objectif est de faciliter la
                    circulation des livres et de créer une communauté autour de la connaissance, de la découverte et du
                    plaisir de lire.

                    En favorisant le partage plutôt que l’accumulation, nous contribuons à rendre la lecture plus accessible
                    tout en valorisant chaque livre.
                </p>

                <p className="propos_text">
                    Au-delà du simple échange de livres, nous souhaitons aussi encourager la solidarité et le partage du
                    savoir entre les membres de la communauté. Chaque livre partagé devient une opportunité de découverte,
                    d’apprentissage et de rencontre entre lecteurs, contribuant ainsi à faire vivre la culture et la passion
                    de la lecture.
                </p>

                <div className="propos_btns">
                    <button className="btn_create">Créer un compte</button>
                    <button className="btn_connect">Se connecter</button>
                </div>
            </div>
        </section>
    );
}

export default About;