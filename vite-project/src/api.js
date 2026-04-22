import axios from "axios";

const API = "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
    headers: { Authorization: `Bearer ${getToken()}` }
});

export const getInitiales = (nom) => {
    if (!nom) return "??";
    return nom.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
};

export const login = (data) => axios.post(`${API}/login`, data);
export const register = (data) => axios.post(`${API}/register`, data);

export const getProfil = () => axios.get(`${API}/profil`, headers());
export const updateProfil = (data) => axios.put(`${API}/profil`, data, headers());

export const getLivres = () => axios.get(`${API}/livres`);
export const getMesLivres = () => axios.get(`${API}/livres/moi`, headers());
export const ajouterLivre = (data) => axios.post(`${API}/livres`, data, headers());
export const supprimerLivre = (id) => axios.delete(`${API}/livres/${id}`, headers());

export const getConversations = () => axios.get(`${API}/messages/conversations`, headers());
export const getMessages = (id) => axios.get(`${API}/messages/${id}`, headers());
export const envoyerMessage = (data) => axios.post(`${API}/messages`, data, headers());

export const getFavoris = () => axios.get(`${API}/favoris`, headers());
export const ajouterFavori = (livreId) => axios.post(`${API}/favoris/livres/${livreId}`, {}, headers());
export const supprimerFavori = (livreId) => axios.delete(`${API}/favoris/livres/${livreId}`, headers());