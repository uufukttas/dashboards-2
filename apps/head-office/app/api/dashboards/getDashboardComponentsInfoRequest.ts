import axios from 'axios';

const getDashboardComponentInfoRequest = async (dashboardPageCode: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL
            }/Dashboard/GetDashboardItems/Dashboard/GetDashboardItems/${dashboardPageCode}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            }
        );

        return response.data;
    } catch (error) {
        return [];
    }
};

export { getDashboardComponentInfoRequest };
