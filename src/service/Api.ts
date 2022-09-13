import axios from 'axios';
import store from '../store/store';

const Api = () => {

    const state = store.getState();

    let headers: {'X-API-KEY': string, Authorization?: string} = {
        'X-API-KEY': process.env.REACT_APP_API_KEY as string
    };
    if (state.user.accessToken) {
        headers = {...headers, Authorization: `Bearer ${state.user.accessToken}`};
    }
    const axInstance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
        headers
    });

    return axInstance;
}

export default Api;