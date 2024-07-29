import axios from "axios";

const deleteComissionRequest = async (id: number, stationId: number) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/UpdateCommisionRate` || '',
                ({
                    rid: id,
                    stationId,
                    isDelete: 1,
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                },
            );

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { deleteComissionRequest };
