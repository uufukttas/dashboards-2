import axios from "axios";
import type { IGetUsersManagementUsersResponseProps } from "./types";

const getUsersRequest = async (): Promise<IGetUsersManagementUsersResponseProps> => {
    try {
        const response = await axios.get(process.env.GET_USERS || '');

        return response.data;
    } catch (error) {
        return {
            data: [],
            message: "İşlem sırasında hata oluştu. Lütfen tekrar deneyiniz.",
            success: false,
        };
    };
};

export { getUsersRequest };
