import { render } from '@testing-library/react';

import Close from './close';

describe('Close', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Close />);
    expect(baseElement).toBeTruthy();
  });
});
