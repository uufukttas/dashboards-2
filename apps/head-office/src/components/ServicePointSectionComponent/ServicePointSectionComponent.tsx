import {Button} from '@projects/button';
import {Modal} from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import { toggleVisibility } from '../../../app/redux/features/ServicePointCreateModal';


export interface ServicePointSectionComponentProps {
  children?: React.ReactNode;
}

export function ServicePointSectionComponent() {
  const isVisible = useSelector((state: RootState) => state.modalStatusReducer.isOpen);
  const dispatch = useDispatch();

  const handeClick = () => {
    dispatch(toggleVisibility(isVisible));
  }
  return (
    <div className='flex justify-between items-center pt-12'>
      <Button
        className='bg-blue-500 text-white'
        onClick={handeClick}
        type="button"
      > Create New Service Point
      </Button>
      <Modal />
    </div>
  );
}

export default ServicePointSectionComponent;
