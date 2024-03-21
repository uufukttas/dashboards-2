import React, { useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import './Accordion.css';

interface IAccordionProps {
  accordionTitle: string;
  accordionContent: React.ReactNode;
  titleClassName?: string;
  contentClassName?: string;
};

const Accordion = ({ accordionTitle, accordionContent, titleClassName, contentClassName = "" }: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${BRAND_PREFIX}-accordion-container border w-full my-4 rounded-lg`}>
      <div className={`${BRAND_PREFIX}-accordion-header`} onClick={toggleAccordion}>
        <div className={`${BRAND_PREFIX}-accordion-title ${titleClassName}`}>{accordionTitle}</div>
        <div className={`${BRAND_PREFIX}-accordion-arrow ${isOpen ? 'open' : ''}`}></div>
      </div>
      <div className={`${BRAND_PREFIX}-accordion-content ${isOpen ? 'open' : 'close'} px-8 bg-white rounded-lg ${contentClassName}`}>
        {accordionContent}
      </div>
    </div>
  );
};

export default Accordion;
