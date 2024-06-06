import axios from "axios";


const updateUserRequest = async (data) => {
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
