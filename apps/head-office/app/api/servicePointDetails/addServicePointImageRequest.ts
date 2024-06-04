import axios from "axios";

const addServicePointImageRequest = async (formData: FormData): Promise<{ message: string }> => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_ADD_IMAGE_URL || '',
            formData,
            {
                headers: { 'Content-Type': 'application/json' },
                maxBodyLength: Infinity,
            }
        );

        return response.data;
    } catch (error) {
        return { message: 'Error uploading file' }
    }
};

export { addServicePointImageRequest };
