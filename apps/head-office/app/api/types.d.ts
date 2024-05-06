interface IResponseDataProps {
    message: string;
};

export interface IResponseStatusProps {
    status: number;
    data : IResponseDataProps;
    message?: string;
};