import axios from "axios";
import { IServicePointDetailsFeatureResponse } from "./types";

const getSelectedStationFeatures = async (stationId: number): Promise<IServicePointDetailsFeatureResponse> => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/StationFeature/StationSelectedValues` || '',
                JSON.stringify(
                    {
                        featureTypeModel: [
                            {
                                featureType: 1
                            },
                            {
                                featureType: 2
                            },
                            {
                                featureType: 8
                            }
                        ],
                        stationId: stationId
                    }
                ),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data);

        return response;
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    };
};

export { getSelectedStationFeatures };
