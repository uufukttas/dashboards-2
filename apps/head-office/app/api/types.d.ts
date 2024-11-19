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
export interface IDeleteUserRequestResponseProps {
    message: string;
    success: boolean;
};
export interface ILoginRequestProps {
    [key: string]: string;
};
export interface IResponseInfoProps {
    status: number;
    data: IResponseDataProps;
    message?: string;
    token: {
        result: string;
    };
};
export interface IResponseProps {
    error: {
        response: IResponseInfoProps;
    },
};


export interface Get<T = undefined> {
  id?: number;
  params?: T;
}

export interface Post<T = undefined> {
  body: T;
}

export interface Put<T = undefined> {
  id: number;
  body: T;
}

export interface Delete {
  id: number;
}
