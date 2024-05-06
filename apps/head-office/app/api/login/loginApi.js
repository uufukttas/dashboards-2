import axios from 'axios';

const loginRequest = async (credentials) => {
    try {
        const response = await axios.post(
            process.env.LOGIN_URL || '',
            credentials,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response;
    } catch (error) {
        console.log('error', error)
        return error.response;
    }
};

export default loginRequest;
