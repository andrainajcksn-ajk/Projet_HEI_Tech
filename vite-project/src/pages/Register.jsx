import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const validate = () => {
        let newErrors = {};

        if (!name) {
            newErrors.name = "Nom requis";
        }

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
            const res = await axios.post("http://localhost:5000/register", {
                name,
                email,
                password,
            });

            alert(res.data.message);

            navigate("/dashboard"); 
        } catch (err) {
            alert("Erreur serveur");
        }
    };

    return (
        <section className="auth_container">
            <div className="auth_box">
                <div className="auth_elements">
                    <h2>Créer un compte</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}

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

                        <button className="btn_connect" type="submit">Créer un compte</button>
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