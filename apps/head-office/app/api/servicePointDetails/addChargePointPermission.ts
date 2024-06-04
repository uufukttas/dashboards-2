import axios from "axios";

const addChargePointPermission = async (permissionPhoneNumber: string, slug: string) => {
    try {
        const response = axios
        .post(
            process.env.NEXT_PUBLIC_CHARGE_POINT_USER_PERMISSION_URL || '',
            {
                phoneNumber: permissionPhoneNumber,
                stationId: Number(slug),
            },
            { headers: { 'Content-Type': 'application/json' } }
        )

        return response;
    } catch (error) {
        console.error(error);
    }
};

export { addChargePointPermission };