import React, { useState } from 'react';
import './Accordion.css';

const Accordion = ({ accordionTitle, accordionContent, className }: { accordionTitle: string, accordionContent: React.ReactNode,  className: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border w-full ${className}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className="title">{accordionTitle}</div>
        <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
      </div>
      {(
        <div className={`accordion-content ${isOpen ? 'open' : 'close'} px-8 bg-white rounded-lg`}>
          {accordionContent}
        </div>
      )}
    </div>
  );
};

export default Accordion;
