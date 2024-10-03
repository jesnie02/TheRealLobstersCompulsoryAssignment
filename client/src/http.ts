import {Api} from './Api.ts';

export const baseUrl = 'http://localhost:5139';

export const http = new Api({
    baseURL: baseUrl
});

// http.instance.interceptors.response.use( r => {
//     if(r.status == 401) {
//
//     }
// })

//TODO error messages here