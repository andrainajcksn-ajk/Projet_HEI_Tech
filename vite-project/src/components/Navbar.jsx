import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const scrollToPropos = () => {
        document.getElementById("propos").scrollIntoView({ behavior: "smooth" });
    };
    return (
        <header className="header">
            <nav>
                <img className="logo" src="/Images/Logo_livres_atero-removebg-preview.png" alt="" />

                <div className="btns">
                    <button className="btn_contact" onClick={() => navigate("/register")}>Créer un compte</button>
                    <button className="btn_don" onClick={() => navigate("/login")}>Se connecter</button>
                </div>
            </nav>

            <section className="header_text">
                <div className="title_Atero">
                    <h1 className="bienvenue">Bienvenue sur</h1>
                    <h1 className="title_princ">
                        <span className="atero">Atero</span>{" "}
                        <span className="ka">ka Alao</span>
                    </h1>
                    <h2>Un livre donné, un esprit enrichi...</h2>
                </div>

                <div className="header_btns">
                    <button className="btn_déposer" onClick={scrollToPropos}>Savoir plus</button>
                </div>
            </section>
        </header>
    );
}

export default Navbar;