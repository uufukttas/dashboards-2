import React from 'react';
import './Navbar.css';
import { Button } from '@projects/button';

interface INavbarItemProps {
  title: string;
};

interface INavbarProps {
  items: INavbarItemProps[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const Navbar = ({ activeIndex, items, setActiveIndex }: INavbarProps) => {
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <nav className='sh-navbar-container w-full mx-8'>
      {
        items.map((item, index) => (
          <Button key={index}
            className={`sh-navbar-item px-4 py-0 ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
            type="button"
          >
            {item.title}
          </Button>
        ))
      }
      <div className="animation start-home"></div>
    </nav>
  )
}

export default Navbar