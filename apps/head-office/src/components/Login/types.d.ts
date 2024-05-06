interface IContentTypeProps {
    [key: string]: string;
};
interface IResponseDataProps {
    message: string;
};
interface IResponseStatusProps {
    status: number;
    data : IResponseDataProps;
    message?: string;
};
export interface IHeaderProps {
    headers: IContentTypeProps
};
export interface ILoginFormDataProps {
    username: string;
    password: string;
};
export interface ILoginRequestDataProps {
    [key: string]: string;
};
export interface IResponseErrorProps {
    response: IResponseStatusProps;
};
