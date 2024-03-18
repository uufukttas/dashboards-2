import React from 'react';
import './Navbar.css';

interface INavbarItemProps {
  title: string;
  url: string;
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
          <a key={index}
            href={item.url}
            className={`sh-navbar-item px-4 ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            {item.title}
          </a>
        ))
      }
      <div className="animation start-home"></div>
    </nav>
  )
}

export default Navbar