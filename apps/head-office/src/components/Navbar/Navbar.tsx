import React from 'react';
import { Button } from '@projects/button';
import './Navbar.css';

interface INavbarItemProps {
  title: string | JSX.Element;
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
    <nav className='sh-navbar-container lg:mx-8 flex items-center'>
      {
        items.map((item, index) => (
          <Button key={index}
            className={`sh-navbar-item px-4 py-0 w-1/6 flex justify-center items-center text-2xl ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
            type="button"
          >
            {item.title}
          </Button>
        ))
      }
    </nav>
  )
}

export default Navbar