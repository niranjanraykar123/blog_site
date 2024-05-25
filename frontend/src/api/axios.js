
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export default instance;
