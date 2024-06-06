import axios from "axios";

const updateWorkingHoursRequest = async (data: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/UpdateWorkHours` || '',
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { updateWorkingHoursRequest };
