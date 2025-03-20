
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 'active' | 'expired' | 'pending' | 'canceled' | 'paid' | 'unpaid' | 'partial';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { color: string; label: string }> = {
  active: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Ativo' },
  expired: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Expirado' },
  pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pendente' },
  canceled: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Cancelado' },
  paid: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Pago' },
  unpaid: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Não Pago' },
  partial: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Parcial' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { color, label } = statusConfig[status];
  
  return (
    <Badge className={cn(color, "font-normal border", className)}>
      {label}
    </Badge>
  );
};

export default StatusBadge;
