import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer className={``} />);
    expect(baseElement).toBeTruthy();
  });
});
