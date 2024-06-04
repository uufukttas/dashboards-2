import axios from "axios";

const deleteComissionRequest = async (id: number, stationId: number) => {
    try {
        const response = await axios
            .post(
                process.env.NEXT_PUBLIC_UPDATE_COMISSION_URL || '',
                ({
                    rid: id,
                    stationId,
                    isDelete: 1,
                }),
                { headers: { 'Content-Type': 'application/json' } }
            );

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { deleteComissionRequest };
