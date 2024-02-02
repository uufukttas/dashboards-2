import { render } from '@testing-library/react';

import Form from './Form';

describe('Form', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Form onClick={() => { }} />);
    expect(baseElement).toBeTruthy();
  });
});
