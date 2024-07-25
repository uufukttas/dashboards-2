import axios from 'axios';

const getLanguageListRequest = async () => {
    try {
        const languageList = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Language/LanguagesList`);

        if (languageList.data.success) {
            return languageList.data.data;
        }
    } catch (error) {
        return [];
    };
};

export { getLanguageListRequest };
