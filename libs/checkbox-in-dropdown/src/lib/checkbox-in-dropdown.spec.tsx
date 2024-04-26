import { render } from '@testing-library/react';

import CheckboxInDropdown from './checkbox-in-dropdown';

describe('CheckboxInDropdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxInDropdown />);
    expect(baseElement).toBeTruthy();
  });
});
