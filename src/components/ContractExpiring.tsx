
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, ChevronRight } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCard from '@/components/AnimatedCard';
import { Contract } from '@/lib/data';

interface ContractExpiringProps {
  contracts: Contract[];
  days?: number;
  className?: string;
  delay?: number;
}

const ContractExpiring: React.FC<ContractExpiringProps> = ({ 
  contracts, 
  days = 30, 
  className, 
  delay = 0 
}) => {
  // Filter contracts that will expire within the specified days
  const expiringContracts = contracts.filter(contract => {
    if (contract.status !== 'active') return false;
    
    const today = new Date();
    const endDate = new Date(contract.endDate);
    const daysRemaining = differenceInDays(endDate, today);
    
    return daysRemaining >= 0 && daysRemaining <= days;
  });

  if (expiringContracts.length === 0) {
    return null;
  }

  return (
    <AnimatedCard delay={delay} className="border-amber-200 bg-amber-50 overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <CalendarClock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-medium text-amber-800">Contratos expirando em breve</h4>
            <p className="text-sm text-amber-700 mt-1">
              {expiringContracts.length === 1 
                ? 'Existe 1 contrato que expira nos próximos'
                : `Existem ${expiringContracts.length} contratos que expiram nos próximos`} {days} dias.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-md overflow-hidden shadow-sm">
          <div className="max-h-60 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 sticky top-0">
                <tr className="border-b border-amber-100">
                  <th className="px-3 py-2 text-left font-medium text-amber-800">Contrato</th>
                  <th className="px-3 py-2 text-left font-medium text-amber-800">Fornecedor</th>
                  <th className="px-3 py-2 text-left font-medium text-amber-800">Término</th>
                  <th className="px-3 py-2 text-right font-medium text-amber-800">Dias Restantes</th>
                </tr>
              </thead>
              <tbody>
                {expiringContracts.map(contract => {
                  const endDate = new Date(contract.endDate);
                  const daysRemaining = differenceInDays(endDate, new Date());
                  
                  return (
                    <tr key={contract.id} className="border-b border-amber-50 hover:bg-amber-50/50">
                      <td className="px-3 py-2">{contract.number}</td>
                      <td className="px-3 py-2">{contract.supplier.name}</td>
                      <td className="px-3 py-2">{format(new Date(contract.endDate), 'dd/MM/yyyy')}</td>
                      <td className="px-3 py-2 text-right">
                        <span className={`font-medium ${
                          daysRemaining <= 7 ? 'text-red-600' : 
                          daysRemaining <= 15 ? 'text-orange-600' : 'text-amber-600'
                        }`}>
                          {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="link" asChild className="p-0 h-auto text-amber-600 hover:text-amber-700">
            <Link to="/contracts" className="flex items-center gap-1">
              <span>Ver todos os contratos</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </AnimatedCard>
  );
};

export default ContractExpiring;
