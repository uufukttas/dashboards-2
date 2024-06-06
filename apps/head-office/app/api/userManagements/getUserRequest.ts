import axios from "axios";

const getUserRequest = async (userId: number) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/GetUser`,
                { userId: userId },
                { headers: { 'Content-Type': 'application/json' } }
            )
        return response.data.data;
    } catch (error) {
        console.error('getUserRequest error: ', error);
    };
};

export { getUserRequest };
