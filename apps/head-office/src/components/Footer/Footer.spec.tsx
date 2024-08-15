import { render } from '@testing-library/react';

import Header from './Footer';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeTruthy();
  });
});
