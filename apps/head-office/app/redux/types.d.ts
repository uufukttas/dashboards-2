interface IChargeUnitDataProps {
    code: string;
    brandId: number;
    connectorCount: number;
    ocppVersion: number;
    isFreeUsage: boolean;
    isLimitedUsage: boolean;
    investor: number;
    status: string;
    accessType: string;
    location: string;
    chargePointId: number;
};
export interface IAlertInformationStateProps {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
};

export type IChargePointDataStateProps = {
    isChargePointDataUpdated: boolean;
};

export type IChargeUnitDataStateProps = {
    chargeUnitData: IChargeUnitDataProps;
};

export type IDialogInformationStateProps = {
    isVisible: boolean;
    actionType: string;
    data: number;
};