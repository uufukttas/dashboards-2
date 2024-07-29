import axios from 'axios';

const addWorkingHoursRequest = async (data: string) => {
    try {
        const response = await axios.post(

            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/AddWorkHours` || '',
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            },
        );
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { addWorkingHoursRequest };