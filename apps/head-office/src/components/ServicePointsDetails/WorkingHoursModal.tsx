import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@projects/button';
import { Label } from '@projects/label';
import './ServicePointDetails.css'
import { Radio } from '@projects/radio';
import { BRAND_PREFIX } from '../../constants/constants';

const WorkingHoursModal = () => {
  const [isSelectboxOpen, setIsSelectboxOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [workingHoursData, setWorkingHoursData] = useState({
    openingTime: '',
    closingTime: '',
    status: 'active',
    days: []
  });
  const days = [
    { label: 'Pazartesi', value: 'pazartesi' },
    { label: 'Sali', value: 'sali' },
    { label: 'Carsamba', value: 'carsamba' },
    { label: 'Persembe', value: 'persembe' },
    { label: 'Cuma', value: 'cuma' },
    { label: 'Cumartesi', value: 'cumartesi' },
    { label: 'Pazar', value: 'pazar' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSelectboxOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsSelectboxOpen(!isSelectboxOpen);
  };

  const handleOptionChange = (value: string) => {
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter(option => option !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log('value', value)
  };

  const handleSubmit = () => {
    console.log('selectedDays', selectedDays);
  }

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWorkingHoursData({ ...workingHoursData, [name]: value });
  };

  return (
    <div className="working-hours-modal-form-container relative p-6 bg-white rounded-lg ">
      <form
        className={`${BRAND_PREFIX}-modal-form`}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className={`working-hours-days-container`}>
          <Label
            className="working-hours-label block mb-2 text-heading font-semibold"
            htmlFor={'working-hours-days'}
            labelText={'Calisma Saatleri'}
          />
          <div className="working-hours-dropdown-checkbox w-1/4" ref={dropdownRef}>
            <button className="dropdown-toggle w-full" onClick={toggleDropdown}>
              Select options
            </button>
            {isSelectboxOpen && (
              <div className="days-menu w-full">
                {days.map(day => (
                  <label key={day.value}>
                    <input
                      type="checkbox"
                      value={day.value}
                      checked={selectedDays.includes(day.value)}
                      onChange={() => handleOptionChange(day.value)}
                    />
                    {day.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className={`working-hours-status-header`}>
            <h3 className={`working-hours-status-textblock mb-2 text-sm font-semibold text-gray-900 mt-4`}>Durumu</h3>
          </div>
          <div className={`working-hours-status-inputs-container flex`}>
            <div className={`working-hours-option-container flex w-1/2 items-center mb-4`}>
              <Label
                className={`working-hours-status-active-label block mb-0 pr-4`}
                htmlFor={`working-hours-status-active`}
                labelText={`Aktif`} />
              <Radio
                className={`working-hours-status-input text-blue-500 text-sm block`}
                id={`working-hours-status-active`}
                name={`working-hours-status`}
                onChange={() => { }}
              />
            </div>
            <div className={`working-hours-option-container flex w-1/2 items-center mb-4`}>
              <Label
                className={`working-hours-status-passive-label block mb-0 pr-4`}
                htmlFor={`working-hours-status-passive`}
                labelText={`Pasif`} />
              <Radio
                className={`working-hours-status-input text-blue-500 text-sm block`}
                id={`working-hours-status-passive`}
                name={`working-hours-status`}
                onChange={() => { }}
              />
            </div>
          </div>
          <div className='working-hours-modal-buttons-container flex justify-start mt-2'>
            <div className='working-hours-opening-time-container'>
              <Label
                className="working-hours-opening-time-label block mb-2 text-heading font-semibold"
                htmlFor={'working-hours-opening-time'}
                labelText={'Acilis Saati'}
              />
              <input type="time" id="opening" name="clock" onChange={handleChange} />
            </div>
            <div className='working-hours-closing-time-container'>
              <Label
                className="working-hours-closing-time-label block mb-2 text-heading font-semibold"
                htmlFor={'working-hours-closing-time'}
                labelText={'Kapanis Saati'}
              />
              <input type="time" id="closing" name="clock" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className='working-hours-modal-buttons-container flex justify-end mt-2'>
          <Button
            className={`working-hours-modal-save-button ml-4 bg-primary text-text text-sm rounded-lg block p-2.5`}
            type="submit"
            buttonText="Kaydet"
          />
        </div>
      </form>
    </div>
  );
};

export default WorkingHoursModal;
