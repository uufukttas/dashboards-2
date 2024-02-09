import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { HamburgerMenuIcon, PersonIcon } from '@projects/icons';
import { RootState } from '../../../app/redux/store';
import { toggleExpanded } from '../../../app/redux/features/isExpanded';
import './Header.scss';

export interface HeaderProps {
  className?: string;
};

export function Header({
  className
}: HeaderProps) {
  const isExpanded = useSelector((state: RootState) => state.expandedReducer.isExpanded);
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(toggleExpanded(isExpanded));
  };

  return (
    <div className={`sh-header-container justify-between shadow-custom ${className} bg-white sticky top-0`}>
      <Button className='sh-sidebar-toggle-button bg-white hover:bg-white mx-8' type='button' onClick={handleSidebarToggle}>
        <HamburgerMenuIcon />
      </Button>
      <Button className='sh-sidebar-profile-button bg-white hover:bg-white border border-[#eceece] flex items-center mx-8 rounded-full px-2 ' type='button' onClick={() => {}}>
        <PersonIcon strokeColor={'black'} />
      </Button>
    </div>
  );
};

export default Header;
