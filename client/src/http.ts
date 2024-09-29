import {Api} from './Api.ts';

export const baseUrl = 'http://localhost:5139';

export const http = new Api({
    baseURL: baseUrl
});