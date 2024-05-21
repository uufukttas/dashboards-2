import axios from "axios";
import { ISearchedUserDataResponseProps } from './types';

const searchUserRequest = async (searchedText: string): Promise<ISearchedUserDataResponseProps> => {
    try {
        const response = await axios.post(
            process.env.GET_SEARCH_USERS || '',
            JSON.stringify({ "userName": searchedText }),
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        return { 
            data: [],
            success: false,
        };
    };
};

export { searchUserRequest };
