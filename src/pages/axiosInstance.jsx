import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', //  l'URL de notre API Symfony
});

// l'Ajout d'un intercepteur pour ajouter le token à chaque requête sortante
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Ajouter le token à l'en-tête Authorization
        }
        return config;
    },
    error => {
        if (error.response && error.response.status === 403) {
            // Accès refusé : afficher un message d'erreur
            alert(error.response.data.error);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
