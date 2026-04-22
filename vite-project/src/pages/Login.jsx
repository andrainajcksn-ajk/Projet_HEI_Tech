import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

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
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("utilisateur", JSON.stringify(res.data.utilisateur));
            navigate("/dashboard");
        } catch (err) {
            setErrors({ general: err.response?.data?.message || "Erreur serveur" });
        }
    };

    // Génère les 50 barres de l'animation
    const barres = Array.from({ length: 50 }, (_, i) => (
        <span key={i} style={{ "--i": i }}></span>
    ));

    return (
        <div className="container">

            {/* Animation circulaire */}
            {barres}

            {/* Formulaire */}
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h2>Connexion</h2>

                    {errors.general && (
                        <p style={{ color: "#ff4d4d", textAlign: "center", marginBottom: "10px", fontSize: "0.85em" }}>
                            {errors.general}
                        </p>
                    )}

                    <div className="input-box">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Email</label>
                        {errors.email && (
                            <p style={{ color: "#ff4d4d", fontSize: "0.75em", marginTop: "4px", paddingLeft: "20px" }}>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Mot de passe</label>
                        {errors.password && (
                            <p style={{ color: "#ff4d4d", fontSize: "0.75em", marginTop: "4px", paddingLeft: "20px" }}>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="forgot-pass">
                        <a href="#">Mot de passe oublié ?</a>
                    </div>

                    <button type="submit" className="btn">Se connecter</button>

                    <div className="signup-link">
                        <a href="/register">Créer un compte</a>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;