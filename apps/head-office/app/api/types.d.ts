interface IResponseDataProps {
    message: string;
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
