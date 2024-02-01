import { render } from '@testing-library/react';

import FAQIcon from './faq';

describe('FAQIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FAQIcon />);
    expect(baseElement).toBeTruthy();
  });
});
