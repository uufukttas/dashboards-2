import { render } from '@testing-library/react';

import Background from './Background';

describe('Background', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Background
      backgroundUrl={`https://example.com`}
      className={``}
    />);
    expect(baseElement).toBeTruthy();
  });
});
