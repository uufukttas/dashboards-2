import axios from 'axios';

const addWorkingHoursRequest = async (data: string) => {
    try {
        const response = await axios.post(

            process.env.NEXT_PUBLIC_ADD_WORKING_HOURS || '',
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { addWorkingHoursRequest };