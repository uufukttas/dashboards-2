import axios from 'axios';

const getMapStationsList = async () => {
    try {
        const mapStationsList = await axios.post(
            `http://192.168.3.75:85/api/App/stations`
        );
        if (mapStationsList.data.success) {
            return mapStationsList.data;
        }
    } catch (error) {
        return [];
    };
};

export { getMapStationsList };
