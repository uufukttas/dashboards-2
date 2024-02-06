import { Button } from '@projects/button';
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'apps/head-office/app/redux/store';
import { HamburgerMenuIcon, PersonIcon } from '@projects/icons';
import { toggleExpanded } from 'apps/head-office/app/redux/features/isExpanded';
import './Header.scss'

/* eslint-disable-next-line */
export interface HeaderProps {
  className?: string;
}

export function Header({
  className
}: HeaderProps) {
  const isExpanded = useSelector((state: RootState) => state.expandedReducer.isExpanded);
  const dispatch = useDispatch();
  
  const handleSidebarToggle = () => {
    dispatch(toggleExpanded(isExpanded));
  };
  return (
    <div className={`sh-header-container justify-between shadow-custom ${className} bg-white`}>
      <Button className='sh-sidebar-toggle-button bg-white hover:bg-white mx-8' type='button' onClick={handleSidebarToggle}>
        <HamburgerMenuIcon />
      </Button>
      <Button className='sh-sidebar-profile-button bg-white hover:bg-white border border-[#cecece] flex items-center mx-8 rounded-full px-2 ' type='button' onClick={() => {}}>
        <PersonIcon strokeColor={'black'} />
      </Button>
    </div>
  );
}

export default Header;
