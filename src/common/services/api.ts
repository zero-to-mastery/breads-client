import axios, { AxiosPromise, Method } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URL;
// axios.defaults.baseURL = 'https://breads-server.herokuapp.com/api';

export function setTokenHeader(token: string | boolean): void {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

/**
 * A wrapper around axios that formats errors, etc.
 * @param {string} method - the HTTP verb you want to use
 * @param {string} path - the route path/endpoint
 * @param {object} data - (optional) data in JSON form for POST requests
 */
export const apiCall = (method: Method, url: string, data?: any): AxiosPromise<unknown> => {
    return new Promise((resolve, reject) => {
        return axios.request({method, url, data})
            .then((res: any) => {
                return resolve(res.data);
            })
            .catch((err: any): any => {
                return reject(err.response.data.error);
            })
    });
}