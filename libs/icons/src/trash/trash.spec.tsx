import { render } from '@testing-library/react';

import TrashIcon from './trash';

describe('TrashIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrashIcon />);
    expect(baseElement).toBeTruthy();
  });
});
