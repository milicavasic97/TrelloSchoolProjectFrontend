import axios from "axios";
import enviroment from "../enviroments";
const baseConfig = {
    baseURL: enviroment().baseServiceUrl,
};

export default {
    service: (useAuth) => {
        const instance = axios.create(baseConfig);
        instance.defaults.headers.common["Content-Type"] = "application/json";
        // instance.defaults.headers.get['Accept'] = 'application/json';
        // instance.defaults.headers.post['Accept'] = 'application/json';
        // instance.defaults.headers.post['Content-Type'] = 'application/json';
        instance.defaults.headers.common['x-api-key'] = process.env.REACT_APP_TRELLO_API_KEY;

        if(useAuth) {
            instance.interceptors.request.use(
                async(config) => {
                    const token = sessionStorage.getItem("auth");
                    if(token) {
                        config.headers = {
                            ...config.headers,
                            Authorization: `Bearer ${token}`
                        }; 
                    }
                    return config;
                },
                (error) => {
                    Promise.reject(error);
                }
            );
        }
        return instance;
    },
};
