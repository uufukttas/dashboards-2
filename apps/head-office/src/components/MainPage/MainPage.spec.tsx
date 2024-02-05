import { render } from '@testing-library/react';

import MainPage from './MainPage';

describe('MainPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainPage />);
    expect(baseElement).toBeTruthy();
  });
});
