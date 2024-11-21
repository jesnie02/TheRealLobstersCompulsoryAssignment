// src/hooks/useHttp.ts
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Api } from '../Models/modelIndex.ts';

export const baseUrl = 'http://localhost:5139';

const useHttp = () => {
    const http = new Api({
        baseURL: baseUrl
    });

    // Function to display error messages using react-toastify
    const displayErrorMessage = (message: string) => {
        toast.error(message);
    };

    useEffect(() => {
        const interceptor = http.instance.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    switch (error.response.status) {
                        case 401:
                            displayErrorMessage('Unauthorized access. Please log in.');
                            break;
                        case 403:
                            displayErrorMessage('Forbidden. You do not have permission to access this resource.');
                            break;
                        case 404:
                            displayErrorMessage('Resource not found.');
                            break;
                        case 500:
                            displayErrorMessage('Internal server error. Please try again later.');
                            break;
                        default:
                            displayErrorMessage('An error occurred. Please try again.');
                    }
                } else if (error.request) {
                    // Request was made but no response was received
                    displayErrorMessage('No response from server. Please check your network connection.');
                } else {
                    // Something happened in setting up the request
                    displayErrorMessage('Error in setting up the request.');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            http.instance.interceptors.response.eject(interceptor);
        };
    }, [http]);

    return http;
};

export default useHttp;