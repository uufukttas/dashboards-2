import { Modal } from '../Modal/Modal';
import Table from '../Table/Table';

export interface ServicePointSectionComponentProps {
  children?: React.ReactNode;
}

export function ServicePointSectionComponent() {
  return (
    <div className='flex justify-between items-center pt-12 flex-col'>
      <Modal />
      <div className='flex items-center w-full'>
        <Table />
      </div>
    </div>
  );
}

export default ServicePointSectionComponent;
