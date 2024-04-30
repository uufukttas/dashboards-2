import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Label } from '@projects/label';

interface IDropdownItemProps {
  id: null | number;
  isChecked?: boolean;
  name: string;
  rid: number | null;
  stationFeatureType: number;
  stationFeatureValue: number;
};

interface IDropdownProps {
  className: string;
  id: string;
  inputName: string;
  items: IDropdownItemProps[];
  onChange: (newItems: IDropdownItemProps[]) => void;
};

export function CheckboxInDropdown({ className, id, inputName, items, onChange }: IDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (item: IDropdownItemProps) => {
    const newItems = items.map((i) => {

      if (i.id !== null) {
        if (i.id === item.id || i.rid === item.rid) {
          return { ...i, isChecked: !i.isChecked };
        }
      } else {
        if (i.rid === item.rid) {
          return { ...i, isChecked: !i.isChecked };
        }
      }

      return i;
    });

    onChange(newItems);
  };

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
        className={`${isOpen
          ? 'absolute bg-white shadow-lg w-48 rounded-md z-10'
          : 'hidden'} checkbox-in-dropdown-input-wrapper border w-full`}
        id="checkbox-in-dropdown-input-wrapper"
      >
        {
          items.map((item: IDropdownItemProps, index: number) => (
            <div className="py-2 px-4 checkbox-in-dropdown-input-container flex" key={index}>
              <Checkbox
                checked={item.isChecked}
                className="form-checkbox h-5 w-5 checkbox-in-dropdown-input"
                id={`checkbox-in-dropdown-input-${item.id || item.rid}`}
                name={`checkbox-${item.id || item.rid}`}
                dataAttributes={{
                  'data-payment-type-value': (item.id || item.rid)?.toString() || '',
                }}
                onChange={() => handleCheckboxChange(item)}
              />
              <Label
                className="flex items-center space-x-2 checkbox-in-dropdown-label pl-4"
                htmlFor={`checkbox-${item.id || item.rid}`}
                labelText={item.name}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CheckboxInDropdown;
