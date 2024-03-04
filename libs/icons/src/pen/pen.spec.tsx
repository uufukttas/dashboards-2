import { render } from '@testing-library/react';

import PenIcon from './pen';

describe('Pen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PenIcon />);
    expect(baseElement).toBeTruthy();
  });
});
