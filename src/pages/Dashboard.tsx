
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Briefcase, 
  Receipt, 
  BarChart3, 
  Building2, 
  PackageCheck, 
  ChevronRight, 
  CreditCard, 
  Users, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedCard from '@/components/AnimatedCard';
import PageTransition from '@/components/PageTransition';
import ContractExpiring from '@/components/ContractExpiring';
import { contracts, suppliers, payments, invoices, commitments, departments } from '@/lib/data';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  const totalContractValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const totalPaidValue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const expiringContracts = contracts.filter(
    contract => new Date(contract.endDate) > new Date() && 
    new Date(contract.endDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const unpaidInvoices = invoices.filter(invoice => invoice.status === 'unpaid');

  return (
    <PageTransition>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Welcome Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Bem-vindo, {user?.name}</h2>
                <p className="text-muted-foreground">
                  Aqui está uma visão geral do seu sistema de contratos administrativos.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild>
                  <Link to="/contracts/new">Novo Contrato</Link>
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Stats Cards */}
          <section>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedCard delay={0.1} className="group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {contracts.filter(contract => contract.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {contracts.length} contratos no total
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.2} className="group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Total Contratos</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(totalContractValue)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Valor total dos contratos
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.3} className="group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pagamentos Realizados</CardTitle>
                  <Receipt className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(totalPaidValue)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {payments.length} pagamentos no total
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.4} className="group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fornecedores Ativos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground group-hover:text-violet-500 transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{suppliers.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Fornecedores cadastrados
                  </p>
                </CardContent>
              </AnimatedCard>
            </div>
          </section>

          {/* Alerts & Notifications */}
          <section>
            <h3 className="text-lg font-medium mb-4">Alertas e Notificações</h3>
            <div className="space-y-3">
              {expiringContracts.length > 0 && (
                <AnimatedCard delay={0.5} className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-800">Contratos expirando em breve</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Você tem {expiringContracts.length} contratos que vão expirar nos próximos 30 dias.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1 text-yellow-600 hover:text-yellow-700">
                        <Link to="/contracts" className="flex items-center gap-1">
                          <span>Ver contratos</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              )}

              {unpaidInvoices.length > 0 && (
                <AnimatedCard delay={0.6} className="border-red-200 bg-red-50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <BarChart3 className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800">Notas fiscais não pagas</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Você tem {unpaidInvoices.length} notas fiscais pendentes de pagamento.
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto mt-1 text-red-600 hover:text-red-700">
                        <Link to="/invoices" className="flex items-center gap-1">
                          <span>Ver notas fiscais</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              )}
            </div>
          </section>

          {/* Quick Access */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4 md:col-span-1">
              <h3 className="text-lg font-medium">Acesso Rápido</h3>
              <div className="space-y-2">
                <QuickAccessCard 
                  to="/contracts" 
                  icon={<FileText className="h-5 w-5" />} 
                  title="Gerenciar Contratos" 
                  count={contracts.length}
                  delay={0.7}
                />
                <QuickAccessCard 
                  to="/suppliers" 
                  icon={<Briefcase className="h-5 w-5" />} 
                  title="Gerenciar Fornecedores" 
                  count={suppliers.length}
                  delay={0.8}
                />
                <QuickAccessCard 
                  to="/payments" 
                  icon={<Receipt className="h-5 w-5" />} 
                  title="Gerenciar Pagamentos" 
                  count={payments.length}
                  delay={0.9}
                />
                <QuickAccessCard 
                  to="/invoices" 
                  icon={<BarChart3 className="h-5 w-5" />} 
                  title="Gerenciar Notas Fiscais" 
                  count={invoices.length}
                  delay={1.0}
                />
                <QuickAccessCard 
                  to="/departments" 
                  icon={<Building2 className="h-5 w-5" />} 
                  title="Gerenciar Departamentos" 
                  count={departments.length}
                  delay={1.1}
                />
                <QuickAccessCard 
                  to="/commitments" 
                  icon={<PackageCheck className="h-5 w-5" />} 
                  title="Gerenciar Empenhos" 
                  count={commitments.length}
                  delay={1.2}
                />
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-medium">Contratos Recentes</h3>
              <AnimatedCard className="overflow-hidden" delay={0.7}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left font-medium">Número</th>
                        <th className="px-4 py-3 text-left font-medium">Fornecedor</th>
                        <th className="px-4 py-3 text-left font-medium">Valor</th>
                        <th className="px-4 py-3 text-left font-medium">Término</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contracts.slice(0, 5).map((contract, i) => (
                        <tr 
                          key={contract.id} 
                          className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                        >
                          <td className="px-4 py-3">{contract.number}</td>
                          <td className="px-4 py-3">{contract.supplier.name}</td>
                          <td className="px-4 py-3">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(contract.value)}
                          </td>
                          <td className="px-4 py-3">
                            {new Date(contract.endDate).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              contract.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : contract.status === 'expired'
                                ? 'bg-red-100 text-red-800'
                                : contract.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {contract.status === 'active' 
                                ? 'Ativo' 
                                : contract.status === 'expired'
                                ? 'Expirado'
                                : contract.status === 'pending'
                                ? 'Pendente'
                                : 'Cancelado'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CardFooter className="flex justify-end p-4 pt-2">
                  <Button variant="outline" asChild>
                    <Link to="/contracts">Ver todos os contratos</Link>
                  </Button>
                </CardFooter>
              </AnimatedCard>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

interface QuickAccessCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  count: number;
  delay: number;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ to, icon, title, count, delay }) => {
  return (
    <AnimatedCard delay={delay}>
      <Link to={to} className="block">
        <CardContent className="p-4 flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
              {icon}
            </div>
            <div>
              <h4 className="font-medium group-hover:text-blue-600 transition-colors">{title}</h4>
              <p className="text-xs text-muted-foreground">{count} registros</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
        </CardContent>
      </Link>
    </AnimatedCard>
  );
};

export default Dashboard;
