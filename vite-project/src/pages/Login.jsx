import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};
        if (!email) {
            newErrors.email = "Email requis";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email invalide";
        }
        if (!password) {
            newErrors.password = "Mot de passe requis";
        } else if (password.length < 6) {
            newErrors.password = "Minimum 6 caractères";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });

            if (res.data.message === "Connexion réussie !") {
                navigate("/dashboard"); // ← redirige vers dashboard
            }

        } catch (err) {
            // Affiche un message clair si le serveur est éteint
            setErrors({ general: "Impossible de contacter le serveur. Vérifiez qu'il est lancé." });
        }
    };

    return (
        <section className="auth_container">
            <div className="auth_box">
                <div className="auth_elements">
                    <h2 className="sentence_connect">Se connecter</h2>

                    {/* Message d'erreur général */}
                    {errors.general && <p className="error">{errors.general}</p>}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}

                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}

                        <button className="btn_main">Connexion</button>
                    </form>
                </div>
                <p>
                    Pas de compte ? <a href="/register">Créer un compte</a>
                </p>
            </div>
        </section>
    );
}

export default Login;