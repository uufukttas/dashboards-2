import axios from "axios";
import type { IGetUsersManagementUsersResponseProps, IGetUsersRequestPayloadProps } from "./types";

const getUsersRequest = async (payload: IGetUsersRequestPayloadProps): Promise<IGetUsersManagementUsersResponseProps> => {
    try {
        const response = await axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}/Auth/Users` || '',
                payload,
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
