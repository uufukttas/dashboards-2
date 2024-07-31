import React, { useState } from 'react';

export interface AccordionProps {
  accordionClassName?: string;
  accordionIcon?: JSX.Element | React.ReactNode;
  accordionTitle?: string | JSX.Element;
  actionButton?: JSX.Element | React.ReactNode;
  backgroundColor?: string;
  BRAND_PREFIX: string;
  children: JSX.Element | React.ReactNode;
  contentClassName?: string;
  isAccordionOpen?: boolean;
  titleClassName?: string;
};

export function Accordion({
  accordionClassName,
  accordionIcon,
  accordionTitle,
  actionButton,
  backgroundColor = "primary",
  BRAND_PREFIX,
  children,
  contentClassName = "",
  isAccordionOpen = true,
  titleClassName,
}: AccordionProps): JSX.Element {
  const accordionPrefix: string = `${BRAND_PREFIX}-accordion`;
  const [isOpen, setIsOpen] = useState<boolean>(isAccordionOpen);

  const toggleAccordion = (): void => setIsOpen(!isOpen);

  return (
    <div className={`${accordionPrefix}-content-container border ${accordionClassName}`}>
      <div className={`${accordionPrefix}-header justify-between flex p-2 bg-${backgroundColor}`}>
        <div className={`${accordionPrefix}-left-container flex items-center ${titleClassName}`}>
          <div className={`${accordionPrefix}-title w-full`}>
            {accordionTitle}
          </div>
          {
            accordionIcon && (
              <div className={`${accordionPrefix}-icon-container px-2`}>
                {accordionIcon}
              </div>
            )
          }
        </div>
        <div className={`${accordionPrefix}-right-container flex items-center justify-center`}>
          <div className={`${accordionPrefix}-action-button-container`}>
            {actionButton}
          </div>
          <div
            className={`${accordionPrefix}-arrow ${isOpen ? 'open' : ''} text-2xl cursor-pointer px-2`}
            onClick={toggleAccordion}
          >
            {isOpen ? '▲' : '▼'}
          </div>
        </div>
      </div>
      {
        <div className={
          `${accordionPrefix}-content ${isOpen ? 'open' : 'close'} px-4 md:px-8 bg-white rounded-lg ${contentClassName}`
        }
        >
          {children}
        </div>
      }
    </div>
  );

}

export default Accordion;
