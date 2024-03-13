import { render } from '@testing-library/react';

import ServicePointDetails from './ServicePointDetails';

describe('ServicePointDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServicePointDetails />);
    expect(baseElement).toBeTruthy();
  });
});
