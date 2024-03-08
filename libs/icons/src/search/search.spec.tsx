import { render } from '@testing-library/react';

import SearchIcon from './search';

describe('SearchIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchIcon />);
    expect(baseElement).toBeTruthy();
  });
});
