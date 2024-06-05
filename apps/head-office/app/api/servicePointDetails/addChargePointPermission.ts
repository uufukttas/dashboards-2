import axios from "axios";

const addChargePointPermission = async (permissionPhoneNumber: { name: string; surname: string; phoneNumber: string }, slug: string): Promise<{ message: string; }> => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_CHARGE_POINT_USER_PERMISSION_URL || '',
            {
                name: permissionPhoneNumber.name,
                surname: permissionPhoneNumber.surname,
                phoneNumber: permissionPhoneNumber.phoneNumber,
                stationId: Number(slug),
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        return {
            message: 'Bir hata olustu. Lutfen tekrar deneyiniz.'
        };
    };
};

export { addChargePointPermission };
