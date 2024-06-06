import axios from "axios";
import { IUpdatedUserData } from "./types";

const updateUserRequest = async (data: IUpdatedUserData) => {
    try {
        const response = axios
            .post(
                'https://sharztestapi.azurewebsites.net/Auth/UpdateUser',
                data,
                { headers: { 'Content-Type': 'application/json', } }
            );

            return response;
    } catch (error) {
        console.log(error);
    };
};

export { updateUserRequest };
