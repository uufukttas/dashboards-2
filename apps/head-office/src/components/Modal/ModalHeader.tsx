import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';

interface IModalHeaderProps {
    modalHeaderTitle: string;
    onClose?: () => void;
};

const MofalHeader = ({ modalHeaderTitle, onClose }: IModalHeaderProps) => {
    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);

    const handleClose = () => {
        dispatch(toggleModalVisibility(isModalVisible));

        onClose && onClose();
    };

    return (
        <div className={`${BRAND_PREFIX}-modal-header-title-container flex justify-between items-center border-b`}>
            <h3 className={`${BRAND_PREFIX}-modal-header-title text-lg font-bold text-heading`}>
                {modalHeaderTitle}
            </h3>
            <div className={`${BRAND_PREFIX}-modal-close-button-container`}>
                <Button
                    className={`${BRAND_PREFIX}-modal-close-button text-sm p-1.5 ml-auto inline-flex items-center bg-white text-black hover:bg-white hover:text-black`}
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
