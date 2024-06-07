import axios from "axios";

const addResourceText = async (resources: { resourceKey: string; value: string }[]) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ResourceText/AddMultiple`,
                resources,
                { headers: { 'Content-Type': 'application/json' } }
            );

        return response;
    } catch (error) {
        console.error(error);
    };
};

export { addResourceText };
