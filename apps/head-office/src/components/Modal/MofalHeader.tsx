import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../app/redux/store';

interface IModalHeaderProps {
    modalHeaderTitle: string;
};

const servicePointDataInitialValues = {
    id: 0,
    name: '',
    companyId: 0,
    companyName: '',
    resellerCompanyId: 0,
    resellerName: '',
    isActive: true,
    isDeleted: false,
};

const servicePointInformationInitialValues = {
    id: 0,
    name: '',
    type: '',
    lon: 0,
    lat: 0,
    phone1: '',
    phone2: '',
    address: '',
    cityId: 0,
    districtId: 0,
    opportunities: [],
    freePark: false,
    paymentMethods: '1',
};

const MofalHeader = ({ modalHeaderTitle }: IModalHeaderProps) => {
    const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(toggleModalVisibility(isModalVisible));
        dispatch(setServicePointData(servicePointDataInitialValues));
        dispatch(setServicePointInformation(servicePointInformationInitialValues));
    };

    return (
        <div className={`${BRAND_PREFIX}-modal-header-title-container flex justify-between items-center border-b`}>
            <h3 className={`${BRAND_PREFIX}-modal-header-title text-lg font-bold text-heading`}>
                {modalHeaderTitle}
            </h3>
            <div className={`${BRAND_PREFIX}-modal-close-button-container`}>
                <Button
                    className={`${BRAND_PREFIX}modal-close-button text-sm p-1.5 ml-auto inline-flex items-center bg-white text-black hover:bg-white hover:text-black`}
                    type='button'
                    onClick={handleClose}
                >
                    <FaRegCircleXmark />
                </Button>
            </div>
        </div>
    );
};

export default MofalHeader;
