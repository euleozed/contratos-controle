
import React from 'react';
import { Card } from '@/components/ui/card';

// Define column type to be used with tables
export interface TableColumn<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableWrapperProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
}

const TableWrapper = <T extends {}>({
  data,
  columns,
  onRowClick,
}: TableWrapperProps<T>) => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-sm font-medium text-left ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b hover:bg-muted/50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => {
                    const cellContent = typeof column.accessorKey === 'function'
                      ? column.accessorKey(row)
                      : row[column.accessorKey as keyof T] as React.ReactNode;
                      
                    return (
                      <td
                        key={`${rowIndex}-${colIndex}`}
                        className={`px-4 py-3 text-sm ${column.className || ''}`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TableWrapper;
