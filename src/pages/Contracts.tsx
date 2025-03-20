
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  FileText, 
  FileEdit, 
  Trash2, 
  Filter, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import ContractForm, { ContractFormValues } from '@/components/ContractForm';
import TableWrapper from '@/components/TableWrapper';
import PageTransition from '@/components/PageTransition';
import { Contract, contracts, departments, suppliers } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

const Contracts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [supplierFilter, setSupplierFilter] = useState<string | null>(null);
  const [contractList, setContractList] = useState<Contract[]>(contracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const filteredContracts = contractList.filter(contract => {
    const matchesSearch = contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || contract.status === statusFilter;
    const matchesDepartment = !departmentFilter || contract.department.id === departmentFilter;
    const matchesSupplier = !supplierFilter || contract.supplier.id === supplierFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesSupplier;
  });
  
  const clearFilters = () => {
    setStatusFilter(null);
    setDepartmentFilter(null);
    setSupplierFilter(null);
  };
  
  const hasActiveFilters = statusFilter || departmentFilter || supplierFilter;
  
  const handleAddContract = (data: ContractFormValues) => {
    // In a real application, you would send this data to your backend
    // For now, we'll just add it to our local state
    const newContract: Contract = {
      id: Math.random().toString(36).substring(2, 10),
      number: data.number,
      supplier: suppliers.find(s => s.id === data.supplierId)!,
      department: departments.find(d => d.id === data.departmentId)!,
      value: parseFloat(data.value),
      startDate: data.startDate.toISOString().split('T')[0],
      endDate: data.endDate.toISOString().split('T')[0],
      status: data.status,
      description: data.description,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setContractList(prev => [newContract, ...prev]);
    setIsAddDialogOpen(false);
    
    toast({
      title: 'Contrato adicionado',
      description: `O contrato ${data.number} foi adicionado com sucesso.`,
    });
  };
  
  const handleEditContract = (data: ContractFormValues) => {
    if (!selectedContract) return;
    
    const updatedContract: Contract = {
      ...selectedContract,
      number: data.number,
      supplier: suppliers.find(s => s.id === data.supplierId)!,
      department: departments.find(d => d.id === data.departmentId)!,
      value: parseFloat(data.value),
      startDate: data.startDate.toISOString().split('T')[0],
      endDate: data.endDate.toISOString().split('T')[0],
      status: data.status,
      description: data.description,
    };
    
    setContractList(prev => 
      prev.map(c => c.id === selectedContract.id ? updatedContract : c)
    );
    setIsEditDialogOpen(false);
    setSelectedContract(null);
    
    toast({
      title: 'Contrato atualizado',
      description: `O contrato ${data.number} foi atualizado com sucesso.`,
    });
  };
  
  const handleDeleteContract = () => {
    if (!selectedContract) return;
    
    setContractList(prev => 
      prev.filter(c => c.id !== selectedContract.id)
    );
    setIsDeleteDialogOpen(false);
    setSelectedContract(null);
    
    toast({
      title: 'Contrato excluído',
      description: `O contrato ${selectedContract.number} foi excluído com sucesso.`,
    });
  };
  
  const columns = [
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FileText className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              setSelectedContract(row);
              setIsEditDialogOpen(true);
            }}>
              <FileEdit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setSelectedContract(row);
                setIsDeleteDialogOpen(true);
              }}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: 'text-center',
    },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
              <p className="text-muted-foreground">
                Gerencie todos os contratos administrativos.
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Novo Contrato</span>
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por número, fornecedor..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="expired">Expirado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={departmentFilter || ''} onValueChange={(value) => setDepartmentFilter(value || null)}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Departamento" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os departamentos</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={supplierFilter || ''} onValueChange={(value) => setSupplierFilter(value || null)}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Fornecedor" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os fornecedores</SelectItem>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {hasActiveFilters && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    {statusFilter && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Status: {
                          statusFilter === 'active' ? 'Ativo' :
                          statusFilter === 'expired' ? 'Expirado' :
                          statusFilter === 'pending' ? 'Pendente' : 'Cancelado'
                        }
                        <button 
                          onClick={() => setStatusFilter(null)} 
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {departmentFilter && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Departamento: {departments.find(d => d.id === departmentFilter)?.name}
                        <button 
                          onClick={() => setDepartmentFilter(null)} 
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {supplierFilter && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Fornecedor: {suppliers.find(s => s.id === supplierFilter)?.name}
                        <button 
                          onClick={() => setSupplierFilter(null)} 
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                  
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contracts Table */}
          <TableWrapper 
            data={filteredContracts} 
            columns={columns} 
            onRowClick={(row) => navigate(`/contracts/${row.id}`)}
          />
        </div>
      </div>
      
      {/* Add Contract Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Contrato</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar um novo contrato.
            </DialogDescription>
          </DialogHeader>
          <ContractForm 
            onSubmit={handleAddContract} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Contract Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Contrato</DialogTitle>
            <DialogDescription>
              Edite as informações do contrato.
            </DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <ContractForm 
              contract={selectedContract}
              onSubmit={handleEditContract} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedContract(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Contract Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Contrato</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedContract(null);
              }}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteContract}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default Contracts;
