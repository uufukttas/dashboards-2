import axios from "axios";

const deleteServicePointPermissionRequest = async (permissionId: number) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/ChargePointUserDelete` || '',
                { userId: permissionId },
                { headers: { "Content-Type": "application/json" } }
            );

        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    };
};

export { deleteServicePointPermissionRequest };
