import { render } from '@testing-library/react';

import HamburgerMenuIcon from './hamburgerMenu';

describe('HamburgerMenuIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HamburgerMenuIcon />);
    expect(baseElement).toBeTruthy();
  });
});
