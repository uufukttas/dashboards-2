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

interface IServicePointDataProps {
    id: number;
    name: string;
    companyId: number;
    companyName: string;
    resellerCompanyId: number;
    resellerName: string;
    isActive: boolean;
    isDeleted: boolean;
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

export type IIsLoadingStateProps = {
    isLoading: boolean;
};

export type IIsModalVisibleStateProps = {
    isModalVisible: boolean;
};


export type IIsServicePointDataUpdatedProps = {
    isServicePointDataUpdated: boolean;
};

export type IServicePointDataStateProps = {
    servicePointData: IServicePointDataProps;
};