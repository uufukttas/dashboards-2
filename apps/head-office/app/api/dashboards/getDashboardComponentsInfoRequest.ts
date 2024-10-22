import axios from 'axios';

const getDashboardComponentInfoRequest = async (dashboardPageCode: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Dashboard/GetDashboardItems/Dashboard/GetDashboardItems/maindashboard`,
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` } }
        );

        console.log('response', response)
        return response.data;
    } catch (error) {
        return [];
    }
};

export { getDashboardComponentInfoRequest };
