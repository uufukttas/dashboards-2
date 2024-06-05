import axios from "axios";

const addChargePointPermission = async (permissionPhoneNumber: {name: string; surname: string; phoneNumber: string}, slug: string) => {
    try {
        const response = axios
        .post(
            process.env.NEXT_PUBLIC_CHARGE_POINT_USER_PERMISSION_URL || '',
            {
                name: permissionPhoneNumber.name,
                surname: permissionPhoneNumber.surname,
                phoneNumber: permissionPhoneNumber.phoneNumber,
                stationId: Number(slug),
            },
            { headers: { 'Content-Type': 'application/json' } }
        )

        return response;
    } catch (error) {
        return {
            message: 'Error adding charge point permission',
        }
    }
};

export { addChargePointPermission };