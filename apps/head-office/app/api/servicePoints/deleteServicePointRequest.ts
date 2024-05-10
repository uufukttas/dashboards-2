import axios from "axios";
import type { IDeleteResonseProps } from "./types";

const deleteServicePointRequest = async (servicePointId: number): Promise<IDeleteResonseProps> => {
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

export { deleteServicePointRequest };
