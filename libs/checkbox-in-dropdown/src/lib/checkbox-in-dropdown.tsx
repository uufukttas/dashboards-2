import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

interface IDropdownItemProps {
  name: string;
  id: number;
};

interface IDropdownProps {
  className: string;
  id: string;
  items: IDropdownItemProps[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CheckboxInDropdown({ className, id, items, onChange }: IDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`checkbox-in-dropdown-wrapper relative`} id={id} ref={dropdownRef}>
      <Button
        className="px-4 py-2 rounded-md border w-full text-left"
        id="checkbox-in-dropdown-button"
        type='button'
        onClick={toggleDropdown}>
        Select Options
      </Button>
      <div
        className={`${isOpen ? 'absolute bg-white shadow-lg w-48 rounded-md z-10' : 'hidden'} checkbox-in-dropdown-input-wrapper border w-full border-t-0`}
        id="checkbox-in-dropdown-input-wrapper"
      >
        {
          items.map((item: IDropdownItemProps, index: number) => (
            <div className="py-2 px-4 checkbox-in-dropdown-input-container" key={index}>
              <Label className="flex items-center space-x-2 checkbox-in-dropdown-label" htmlFor='' labelText=''>
                <Input
                  className="form-checkbox h-5 w-5 checkbox-in-dropdown-input"
                  id={''}
                  name={''}
                  type="checkbox"
                  value={item.id}
                  onChange={onChange}
                />
                <span>{item.name}</span>
              </Label>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CheckboxInDropdown;