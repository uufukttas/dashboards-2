export interface IFeatureProps {
    id: null | number;
    isChecked?: boolean;
    name: string; 
    rid: number | null;
    stationFeatureType: number;
    stationFeatureValue: number;
};

export interface IFormDataProps {
    [key: string]: boolean | number | string | string[];
};

export interface IModalFirstPageInputsProps {
    activePage: number;
    stationId: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    setStationId: React.Dispatch<React.SetStateAction<number>>;
};

export interface IModalFourthPageInputsProps {
    activePage: number;
    paymentMethods: IFeatureProps[];
    opportunities: IFeatureProps[];
    stationId: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    setPaymentMethods: React.Dispatch<React.SetStateAction<IFeatureProps[]>>;
};

export interface IModalSecondPageInputsProps {
    activePage: number;
    cities: { rid: number; plateCode: number; name: string; }[];
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    setCities: React.Dispatch<React.SetStateAction<{ rid: number; plateCode: number; name: string; id: null }[]>>;
    setDistricts: React.Dispatch<React.SetStateAction<{ rid: number; name: string; plateCode: number; id: null }[]>>;
};

export interface IModalThirdPageInputsProps {
    activePage: number;
    cities: { rid: number; plateCode: number; name: string; id: null; }[];
    districts: { rid: number; name: string; plateCode: number; id: null }[];
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    setDistricts: React.Dispatch<React.SetStateAction<{ rid: number; name: string; plateCode: number; id: null }[]>>;
    setPaymentMethods: React.Dispatch<React.SetStateAction<IFeatureProps[]>>;
    setOpportunities: React.Dispatch<React.SetStateAction<IFeatureProps[]>>;
};

export interface IPaginationProps {
    currentPage: number;
    totalCounts: number;
    setCurrentPage: (currentPage: number) => void;
};

export interface IPaginationItemProps {
    children: React.ReactNode;
    isActive: boolean;
    isDisabled: boolean;
    page: number;
    onClick: () => void;
};