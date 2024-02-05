import { render } from '@testing-library/react';

import ServicePointSectionComponent from './ServicePointSectionComponent';

describe('ServicePointSectionComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServicePointSectionComponent />);
    expect(baseElement).toBeTruthy();
  });
});
