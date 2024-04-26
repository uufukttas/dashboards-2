import React, { useState } from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

interface IDropdownItemProps {
  name: string;
  id: number;
};

interface IDropdownProps {
  items: IDropdownItemProps[];
};

export const CheckboxInDropdown: React.FC<IDropdownProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="checkbox-in-dropdown-wrapper relative">
      <Button
        className="px-4 py-2 rounded-md border w-full text-left"
        id="checkbox-in-dropdown-button"
        type='button'
        onClick={toggleDropdown}>
        Select Options
      </Button>
      <div className={`${isOpen ? 'absolute bg-white shadow-lg w-48 rounded-md z-10' : 'hidden'} checkbox-in-dropdown-input-wrapper border w-full border-t-0`} id="checkbox-in-dropdown-input-wrapper">
        {
          items.map((item, index) => (
            <div className="py-2 px-4 checkbox-in-dropdown-input-container" key={index}>
              <Label className="flex items-center space-x-2 checkbox-in-dropdown-label" htmlFor='' labelText=''>
                <Input className="form-checkbox h-5 w-5 checkbox-in-dropdown-input" id={ ''} name={'' } type="checkbox" />
                <span>{item.name}</span>
              </Label>
            </div>
          ))
        }
      </div>
    </div>
  );
};
