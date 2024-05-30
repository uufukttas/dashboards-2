import axios from "axios";
import type { IRegisterUserRequestData } from "./types";

const registerUserRequest = async (userData: IRegisterUserRequestData) => {
    try {
        const response = await axios.post(
            'https://sharztestapi.azurewebsites.net/Auth/Register',
            userData,
            { headers: { 'Content-Type': 'application/json', } }
        );

        return response.data;
    } catch (error) {
        console.log('error', error)
    }

};

export { registerUserRequest };
