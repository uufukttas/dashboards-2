import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { AccordionSectionProps } from '../types';

const AccordionSection: React.FC<AccordionSectionProps> = ({ activeTabIndex, index, section, stationId }) => {
  const { title, content: Content, actionButton } = section;
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-details-accordion`;

  return (
    <Accordion
      activeIndex={activeTabIndex}
      className={`${sectionPrefix} my-4 bg-primary border-gray-300 rounded-md`}
      key={section.key}
    >
      {activeTabIndex === index && (
        <AccordionTab
          header={() => (
            <div
              className={`${sectionPrefix}-header-container w-full flex justify-between items-center text-white h-12`}
            >
              <div className={`${sectionPrefix}-header-title-container text-white`}>{title}</div>
              <div className={`${sectionPrefix}-header-action-container`}>
                {actionButton && actionButton(stationId)}
              </div>
            </div>
          )}
          headerClassName={`${sectionPrefix}-header bg-primary border-gray-300 font-bold border rounded-md flex justify-between items-center`}
        >
          <div className={`${sectionPrefix}-info-container`}>
            <Content stationId={stationId} />
          </div>
        </AccordionTab>
      )}
    </Accordion>
  );
};

export default AccordionSection;
