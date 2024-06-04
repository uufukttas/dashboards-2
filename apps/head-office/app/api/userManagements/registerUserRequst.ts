import axios from "axios";
import type { IRegisterUserRequestData } from "./types";

const registerUserRequest = async (userData: IRegisterUserRequestData) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_REGISTER_USER_URL || '',
            userData,
            { headers: { 'Content-Type': 'application/json', } }
        );

        return response.data;
    } catch (error) {
        console.log('error', error)
    }

};

export { registerUserRequest };
