import { render } from '@testing-library/react';

import MainPage from './MainComponent';

describe('MainPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainPage children={<></>} headerName=''/>);
    expect(baseElement).toBeTruthy();
  });
});
