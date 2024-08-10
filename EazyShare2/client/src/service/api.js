import axios from 'axios';

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:8090'

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/upload`, data);
        // console.log("From api: ", response.data);
        return response.data.path;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
        return { error: error.message };
    }
}