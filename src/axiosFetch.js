import axios from 'axios';

const axiosFetch = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PROD_API_URL : process.env.NEXT_LOCAL_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

export default axiosFetch;