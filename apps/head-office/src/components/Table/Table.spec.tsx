import { render } from '@testing-library/react';

import Table from './Table';

describe('Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Table
    attributeName=''
    className=''
    filteredDropdownItems={[]}
    hasFilterData={false}
    roleStyles={{}}
    tableData={[]}
    tableDataCount={0}
    tableHeader={[]}
    tableHeadData={[]}
    />);
    expect(baseElement).toBeTruthy();
  });
});
