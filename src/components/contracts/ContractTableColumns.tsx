
import React from 'react';
import { Contract } from '@/lib/data';
import StatusBadge from '@/components/StatusBadge';
import ContractActionsMenu from './ContractActionsMenu';

export const getContractTableColumns = (
  onEdit: (contract: Contract) => void,
  onDelete: (contract: Contract) => void
) => [
  {
    header: 'Número',
    accessorKey: 'number',
  },
  {
    header: 'Fornecedor',
    accessorKey: (row: Contract) => row.supplier.name,
  },
  {
    header: 'Departamento',
    accessorKey: (row: Contract) => row.department.name,
  },
  {
    header: 'Valor',
    accessorKey: (row: Contract) => new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(row.value),
    className: 'text-right',
  },
  {
    header: 'Início',
    accessorKey: (row: Contract) => new Date(row.startDate).toLocaleDateString('pt-BR'),
  },
  {
    header: 'Término',
    accessorKey: (row: Contract) => new Date(row.endDate).toLocaleDateString('pt-BR'),
  },
  {
    header: 'Status',
    accessorKey: (row: Contract) => <StatusBadge status={row.status} />,
  },
  {
    header: 'Ações',
    accessorKey: (row: Contract) => (
      <ContractActionsMenu 
        contract={row}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
    className: 'text-center',
  },
];

export default getContractTableColumns;
