import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Change this URL to your backend API
});

export default instance;