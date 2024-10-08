import axios from "axios";

const getColorsRequest = async (keyList: string[]) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ResourceText/GetByKeyList`,
                { resourceKeyList: keyList },
                {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                },
            );

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { getColorsRequest };
