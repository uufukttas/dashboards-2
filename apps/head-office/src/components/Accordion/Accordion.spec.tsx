import { render } from '@testing-library/react';

import Accordion from './Accordion';
import type { IAccordionProps } from './types';

describe('Accordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Accordion
        accordionClassName={``}
        accordionTitle={``}
        contentClassName={``}
        isAccordionOpen={false}
      >
        <></>
      </Accordion>);
    expect(baseElement).toBeTruthy();
  });
});