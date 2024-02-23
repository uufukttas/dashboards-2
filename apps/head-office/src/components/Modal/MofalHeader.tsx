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
        <div className="modal-header-title-container flex justify-between items-center border-b ">
            <h3 className="modal-header-title text-lg font-semibold text-gray-900">
                {modalHeaderTitle}
            </h3>
            <div className="modal-close-button-container">
                <Button
                    className="modal-close-button text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={handleClose}
                    type='button'
                >
                    <CloseIcon />
                </Button>
            </div>
        </div>
    );
};

export default MofalHeader;
