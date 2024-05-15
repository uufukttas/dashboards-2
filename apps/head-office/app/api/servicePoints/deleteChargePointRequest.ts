import axios from 'axios';
import type { IChargeUnitsProps, IDeleteResponseDataProps } from './types';

const deleteChargePointRequest = async (deletedChargeUnitData: IChargeUnitsProps[]): Promise<IDeleteResponseDataProps> => {
    try {
        const response = await axios
            .post(
                process.env.UPDATE_STATION_SETTINGS || '',
                JSON.stringify(deletedChargeUnitData),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response);

        return response.data;
    } catch (error) {
        return {
            message: 'İşlem sırasında hata oluştu. Lütfen tekrar deneyiniz.',
            success: false,
            data: false,
        };
    };
};

export { deleteChargePointRequest };
