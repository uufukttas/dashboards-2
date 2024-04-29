import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

interface IDropdownItemProps {
  name: string;
  id: number | null;
  rid: number | null;
};

interface IDropdownProps {
  className: string;
  id: string;
  inputName: string;
  items: IDropdownItemProps[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CheckboxInDropdown({ className, id, inputName, items, onChange }: IDropdownProps) {
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
    <div className={`checkbox-in-dropdown-wrapper relative rounded-md border w-full text-left`} id={id} ref={dropdownRef}>
      <div className='flex w-full'>
        <Button
          className="w-full px-4 py-2 text-left flex justify-between items-center"
          id="checkbox-in-dropdown-button"
          type='button'
          onClick={toggleDropdown}>
          Seciminizi Yapiniz
          <div
            className='arrow-icon text-lg text-gray-900'
            dangerouslySetInnerHTML={{
              __html: `${isOpen ? '&#11205;' : '&#11206;'}`,
            }}
          />
        </Button>
      </div>
      <div
        className={`${isOpen ? 'absolute bg-white shadow-lg w-48 rounded-md z-10' : 'hidden'} checkbox-in-dropdown-input-wrapper border w-full`}
        id="checkbox-in-dropdown-input-wrapper"
      >
        {
          items.map((item: IDropdownItemProps, index: number) => (
            <div className="py-2 px-4 checkbox-in-dropdown-input-container" key={index}>
              <Label className="flex items-center space-x-2 checkbox-in-dropdown-label" htmlFor='' labelText=''>
                <Input
                  className="form-checkbox h-5 w-5 checkbox-in-dropdown-input"
                  id={`checkbox-in-dropdown-input-${item.id || item.rid}`}
                  name={inputName}
                  type="checkbox"
                  value={item.id || item.rid || 0}
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