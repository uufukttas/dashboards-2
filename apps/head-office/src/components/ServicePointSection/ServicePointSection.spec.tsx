import { render } from '@testing-library/react';

import ServicePointSection from './ServicePointSection';

describe('ServicePointSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServicePointSection />);
    expect(baseElement).toBeTruthy();
  });
});
