import { useReactTable } from '@tanstack/react-table';
import { FC, useEffect } from 'react';

interface IBaseTableHeaderProps {}

interface IBaseTableProps {
  columns: any[];
  data: Array<Record<string, unknown>>;
}

export const BaseTable: FC<IBaseTableProps> = (props) => {
  const { data, columns } = props;

  const table = useReactTable({
    columns,
    data,
  });

  useEffect(() => {
    console.log(table.getFlatHeaders());
  }, [table]);

  return (
    <div>
      <table></table>
    </div>
  );
};
