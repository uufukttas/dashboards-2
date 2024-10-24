import axios from 'axios';

const getDashboardComponentValueRequest = async (reportCode: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL
            }/Dashboard/GetDashboardItemData`,
            {
                "pageCode": "maindashboard",
                "reportCode": reportCode,
                "reportType": "KPI",
                "dateFilterStartAt": "2021-10-22T12:42:25.472Z",
                "dateFilterEndAt": "2022-10-22T12:42:25.472Z"
            },
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

export { getDashboardComponentValueRequest };
