import axios from "axios";

const addServicePointImageRequest = async (formData: FormData): Promise<{ message: string }> => {
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/StationPoint/AddImage` || '',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            maxBodyLength: Infinity,
          }
        );

        return response.data;
    } catch (error) {
        return { message: 'Error uploading file' }
    }
};

export { addServicePointImageRequest };
