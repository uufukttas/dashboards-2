import axios from "axios";

const updateColors = async (payloadData: any) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ResourceText/UpdateMultiple`,
                payloadData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                },
            );

        return response.data;
    } catch (error) {
        console.error('updateColors error', error);
    }
};

export { updateColors };
