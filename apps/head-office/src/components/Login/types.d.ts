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
export interface IFormElementProps {
    errors: FieldValues;
    loginFormInput: string;
    index: number;
    loginFormData: ILoginFormDataProps;
    register: UseFormRegister<FieldValues>;
    setLoginFormData: React.Dispatch<React.SetStateAction<ILoginFormDataProps>>;
};
export interface IFormErrorProps {
    loginFormInput: string;
    errors: FieldValues;
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
