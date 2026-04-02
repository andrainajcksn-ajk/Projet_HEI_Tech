const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API fonctionne !");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Champs requis" });
  }

  res.json({ message: "Utilisateur enregistré !" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Champs requis" });
  }

  res.json({ message: "Connexion réussie !" });
});

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});