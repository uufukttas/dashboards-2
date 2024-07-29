import axios from "axios";
import type { IRegisterUserRequestData } from "./types";

const registerUserRequest = async (userData: IRegisterUserRequestData) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/Register` || '',
            userData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.log('error', error)
    }

};

export { registerUserRequest };
