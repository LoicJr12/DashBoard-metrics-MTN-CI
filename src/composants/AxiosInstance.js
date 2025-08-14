import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', 
    headers: {
        'Content-Type': 'application/json',
    },
    // Remplacez par votre URL de base
    // Vous pouvez ajouter d'autres configurations ici
});


axiosInstance.interceptors.request.use(
    config => {
        // Faites quelque chose avant que la requête ne soit envoyée
        // Par exemple, ajouter un token d'authentification
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        // Faites quelque chose avec l'erreur de requête
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        // Si la réponse est correcte, vous pouvez traiter la réponse ici
        return response;
    },
    async error => {
        const originalRequest = error.config;
        // Si une erreur survient, vous pouvez traiter l'erreur ici
        // Par exemple, si une erreur 401 est retournée, vous pouvez appeler une autre API
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            try {
                //const [tokenData, setTokenData] = useState([])
                const refresh_token = localStorage.getItem('refresh_token')
                const refreshResponse = await axios.post('http://127.0.0.1:8000/api/refresh',
                    {
                        refreshtoken : refresh_token
                    }
                    ,{
                        headers: {
                            'Content-Type': 'application/json', // Vous pouvez spécifier d'autres en-têtes si nécessaire
                        }
                    }
                );
    
                console.log("new access token is :",  refreshResponse.data.access_token)
                console.log("new refresh token is :",  refreshResponse.data.refresh_token)
                localStorage.setItem('access_token',  refreshResponse.data.access_token);
                localStorage.setItem('refresh_token',  refreshResponse.data.refresh_token);

                // Mettre à jour l'en-tête de la requête originale avec le nouveau token
                originalRequest.headers['Authorization'] = 'Bearer ' + refreshResponse.data.access_token;

                // Réessayer la requête originale
                return axiosInstance(originalRequest);
                
            } catch (refreshError) {
                // Rediriger vers la page de connexion si le rafraîchissement du token échoue
                //window.location = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);



export default axiosInstance;
