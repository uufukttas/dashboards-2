import axios from 'axios';

export const removeServicePointImageRequest = async (imageId: number) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/StationPoint/RemoveImageByImageId/${imageId}` ||
        '',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return { message: 'Error deleting file' };
  }
};
