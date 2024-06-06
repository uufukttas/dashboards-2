import axios from "axios";
import { ISearchedUserDataResponseProps } from './types';

const searchUserRequest = async (pageNumber: number, searchedText: string): Promise<ISearchedUserDataResponseProps> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/SearchUser` || '',
            ({
                pageNumber,
                'userCount': 10,
                'name': searchedText || '',
            })
        );

        return response.data;
    } catch (error) {
        return {
            count: 0,
            data: [],
            success: false,
        };
    };
};

export { searchUserRequest };
