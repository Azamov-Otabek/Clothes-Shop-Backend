import axios from "axios";
import { getCookies } from "../../utils/cocies";

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


http.interceptors.request.use((config) => {
    const token = getCookies("token")
    if (token) {
        config.headers["Authorization"] = token
    }
    return config
})

export default http