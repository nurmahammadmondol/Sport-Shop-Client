import axios from "axios";


const axoissecure = axios.create({

    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },

})

// Set up an interceptor to dynamically add the token before each request
axoissecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("managertoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



export default axoissecure