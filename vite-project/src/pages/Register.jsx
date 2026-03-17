function Register() {
    return (
        <section className="auth_container">
            <div className="auth_box">
                <div className="auth_elements">
                    <h2>Créer un compte</h2>

                    <form>
                        <input type="text" placeholder="Nom" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Mot de passe" />

                        <button className="btn_main">S'inscrire</button>
                    </form>
                </div>
                <p>
                    Déjà un compte ? <a href="/login">Se connecter</a>
                </p>
            </div>
        </section>
    );
}

export default Register;