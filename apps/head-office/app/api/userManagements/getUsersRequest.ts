import axios from "axios";
import type { IGetUsersManagementUsersResponseProps } from "./types";

const getUsersRequest = async (currentPage: number, searchedUserName?: string): Promise<IGetUsersManagementUsersResponseProps> => {
    try {
        const response = await axios
            .post(process.env.NEXT_PUBLIC_GET_USERS || '',
                ({
                    'pageNumber': currentPage,
                    'userCount': 10,
                    'name': searchedUserName || '',
                })
            );

        return response.data;
    } catch (error) {
        return {
            count: 0,
            data: [],
            message: "İşlem sırasında hata oluştu. Lütfen tekrar deneyiniz.",
            success: false,
        };
    };
};

export { getUsersRequest };
