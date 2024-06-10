import axios from "axios";
import type { IDeleteUserRequestResponseProps } from "../types";

const deleteUserRequest = async (userId: number): Promise<IDeleteUserRequestResponseProps> => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/ChargePointUserDelete` || '',
                JSON.stringify({ "userId": userId }),
                { headers: { 'Content-Type': 'application/json', } }
            );

        return response.data;
    } catch (error) {
        return {
            message: 'Kullanici silinirken bir hata olustu',
            success: false,
        };
    };
};

export { deleteUserRequest };
