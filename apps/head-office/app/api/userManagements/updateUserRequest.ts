import axios from "axios";
import { IUpdatedUserData } from "./types";

const updateUserRequest = async (data: IUpdatedUserData) => {
    try {
        const response = axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/UpdateUser`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

        return response;
    } catch (error) {
        console.log(error);
    };
};

export { updateUserRequest };
