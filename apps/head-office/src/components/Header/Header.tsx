import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { HamburgerMenuIcon, PersonIcon } from '@projects/icons';
import { RootState } from '../../../app/redux/store';
import { toggleExpanded } from '../../../app/redux/features/isSidebarExpand';
import './Header.scss';

interface IHeaderProps {
  className?: string;
};

const Header = ({ className }: IHeaderProps) => {
  const isSidebarExpanded = useSelector((state: RootState) => state.sidebarExpandReducer.isSidebarExpanded);
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(toggleExpanded(isSidebarExpanded));
  };

  return (
    <div className={`sh-header-container justify-between shadow-custom ${className} bg-white sticky top-0`}>
      <Button className="sh-sidebar-toggle-button bg-white hover:bg-white mx-8" type='button' onClick={handleSidebarToggle}>
        <HamburgerMenuIcon />
      </Button>
      <Button className="sh-sidebar-profile-button bg-white hover:bg-white border border-[#eceece] flex items-center mx-8 rounded-full px-2" type='button' onClick={() => {}}>
        <PersonIcon strokeColor={'black'} />
      </Button>
    </div>
  );
};

export default Header;
