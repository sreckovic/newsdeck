import axios from 'axios';
import config from './config';

const instance = axios.create({
    baseURL: config.baseURL ? config.baseURL : null
});

instance.interceptors.request.use(
    request => {
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
