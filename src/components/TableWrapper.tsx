
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface TableWrapperProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  onRowClick?: (row: T) => void;
  className?: string;
}

function TableWrapper<T>({ 
  data, 
  columns, 
  onRowClick,
  className 
}: TableWrapperProps<T>) {
  return (
    <div className={cn("w-full overflow-auto rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, i) => (
              <TableHead key={i} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow 
                key={i} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
              >
                {columns.map((column, j) => (
                  <TableCell key={j} className={column.className}>
                    {typeof column.accessorKey === 'function'
                      ? column.accessorKey(row)
                      : row[column.accessorKey] as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableWrapper;
