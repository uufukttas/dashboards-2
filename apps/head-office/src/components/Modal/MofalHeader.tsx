import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';

interface MofalHeaderProps {
    modalHeaderTitle: string;
};

const MofalHeader = ({
    modalHeaderTitle,
}: MofalHeaderProps) => {
    const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(toggleModalVisibility(isModalVisible));
    };

    return (
        <div className="flex justify-between items-center border-b ">
            <h3 className="text-lg font-semibold text-gray-900">
                {modalHeaderTitle}
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal" onClick={handleClose}>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
        </div>
    )
}

export default MofalHeader