import axios from "axios";

const deleteUserRequest = async (userId: number) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/ChargePointUserDelete` || '',
                JSON.stringify({ "userId": userId }),
                { headers: { 'Content-Type': 'application/json', } }
            );

        return response;
    } catch (error) {
        return error
    };
};

export { deleteUserRequest };
