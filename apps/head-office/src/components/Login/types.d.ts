interface IContentTypeProps {
    [key: string]: string;
};
interface IResponseStatusProps {
    status: number;
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
