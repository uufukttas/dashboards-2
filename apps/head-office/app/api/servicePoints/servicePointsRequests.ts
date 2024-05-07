import axios from "axios";
interface IResponseDataProps {
    data: boolean;
    message: string;
    success: boolean;
};
interface IResponseProps {
    data: IResponseDataProps;
    status: number;
};

const deleteServicePointRequest = async (servicePointId: number): Promise<IResponseProps> => {
    try {
        const response = await axios
            .post(
                process.env.DELETE_STATION_URL || '',
                ({ 'id': servicePointId })
            )
            .then((response) => response)

        return response;
    } catch (error) {
        return {
            data: {
                data: false,
                message: 'İşlem sırasında bir hata oluştu',
                success: false,
            },
            status: 500,
        };
    }
};

export default deleteServicePointRequest;
