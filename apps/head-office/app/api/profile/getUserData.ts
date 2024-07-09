import axios from 'axios';

const getUserData = async (token: string) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/Profile`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    );

    return response.data;
}

export { getUserData };
