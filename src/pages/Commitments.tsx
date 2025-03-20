
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Download } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import TableWrapper from '@/components/TableWrapper';
import { commitments } from '@/lib/data';
import { format } from 'date-fns';

const CommitmentsPage = () => {
  const columns = [
    {
      header: 'Número',
      accessorKey: 'number',
    },
    {
      header: 'Contrato',
      accessorKey: (row) => row.contract.number,
    },
    {
      header: 'Valor Empenhado',
      accessorKey: (row) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(row.amount),
      className: 'font-medium',
    },
    {
      header: 'Data',
      accessorKey: (row) => format(new Date(row.date), 'dd/MM/yyyy'),
    },
    {
      header: 'Ações',
      accessorKey: () => (
        <div className="flex items-center gap-2 justify-end">
          <Button variant="ghost" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Empenhos</h2>
              <p className="text-muted-foreground">
                Gerenciamento de empenhos relacionados aos contratos.
              </p>
            </div>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Novo Empenho</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Empenhos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{commitments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Todos os empenhos registrados
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Valor Total Empenhado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(commitments.reduce((acc, commitment) => acc + commitment.amount, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Soma de todos os empenhos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Contratos com Empenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(commitments.map(c => c.contract.id)).size}
                </div>
                <p className="text-xs text-muted-foreground">
                  Número de contratos com empenhos
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <TableWrapper 
              data={commitments} 
              columns={columns} 
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CommitmentsPage;
