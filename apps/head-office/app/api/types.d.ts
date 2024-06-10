interface IResponseDataProps {
    message: string;
};
export interface IConnectorProps {
    RID: number;
    connectorName: string;
    connectorNr: number;
    id: number;
    isAC: boolean;
    kw: number;
    stationChargePointID: number;
    epdkSocketNumber: number;
};
export interface ILoginRequestProps {
    [key: string]: string;
};
export interface IResponseInfoProps {
    status: number;
    data: IResponseDataProps;
    message?: string;
};
export interface IResponseProps {
    error: {
        response: IResponseInfoProps;
    },
};
