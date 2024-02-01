import { render } from '@testing-library/react';

import GiftBox from './giftBox';

describe('GiftBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GiftBox />);
    expect(baseElement).toBeTruthy();
  });
});
