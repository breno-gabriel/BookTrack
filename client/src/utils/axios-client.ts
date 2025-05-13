import axios from "axios"

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

console.log("React app url: ", import.meta.env.VITE_API_URL);

export default axiosClient  