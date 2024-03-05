import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { CloseIcon } from '@projects/icons';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';

interface IModalHeaderProps {
    modalHeaderTitle: string;
};

const MofalHeader = ({ modalHeaderTitle }: IModalHeaderProps) => {
    const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(toggleModalVisibility(isModalVisible));
    };

    return (
        <div className="sh-modal-header-title-container flex justify-between items-center border-b">
            <h3 className="sh-modal-header-title text-lg font-bold text-heading">
                {modalHeaderTitle}
            </h3>
            <div className="sh-modal-close-button-container">
                <Button
                    className="sh-modal-close-button text-sm p-1.5 ml-auto inline-flex items-center bg-white text-black hover:bg-white hover:text-black"
                    type='button'
                    onClick={handleClose}
                >
                    <CloseIcon />
                </Button>
            </div>
        </div>
    );
};

export default MofalHeader;
