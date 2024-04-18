export interface IAlertInformationStateProps {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
};