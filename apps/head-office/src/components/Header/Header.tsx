import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { HamburgerMenuIcon, PersonIcon } from '@projects/icons';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState } from '../../../app/redux/store';
import './Header.css';

interface IHeaderProps {
  className?: string;
};

const Header = ({ className }: IHeaderProps) => {
  const isSidebarExpanded = useSelector((state: RootState) => state.sidebarExpandReducer.isSidebarExpanded);
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebarExpanded(isSidebarExpanded));
  };

  return (
    <div
      className={`${BRAND_PREFIX}-header-container justify-between border-b border-gray-300 ${className} bg-white sticky top-0 z-10`}
    >
      <Button
        className={`${BRAND_PREFIX}-sidebar-toggle-button bg-white hover:bg-white mx-8`}
        type='button'
        onClick={handleSidebarToggle}
      >
        <HamburgerMenuIcon />
      </Button>
      <Button
        className={`${BRAND_PREFIX}-sidebar-profile-button bg-white hover:bg-white border border-[#eceece] flex items-center mx-8 rounded-full px-2`}
        type='button'
        onClick={() => { }}
      >
        <PersonIcon />
      </Button>
    </div>
  );
};

export default Header;
