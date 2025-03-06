import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://railway-management-system-production.up.railway.app/api', // Change this URL to your backend API
});

export default instance;