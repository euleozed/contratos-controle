
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TableWrapper from '@/components/TableWrapper';
import PageTransition from '@/components/PageTransition';
import ContractForm, { ContractFormValues } from '@/components/ContractForm';
import { Contract, contracts, departments, suppliers } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

// Import refactored components
import FilterCard from '@/components/contracts/FilterCard';
import getContractTableColumns from '@/components/contracts/ContractTableColumns';
import DeleteContractDialog from '@/components/contracts/DeleteContractDialog';

const Contracts = () => {
  const navigate = useNavigate();
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [supplierFilter, setSupplierFilter] = useState<string | null>(null);
  const [contractList, setContractList] = useState<Contract[]>(contracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Filter contracts based on search term and filters
  const filteredContracts = contractList.filter(contract => {
    const matchesSearch = contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || contract.status === statusFilter;
    const matchesDepartment = !departmentFilter || contract.department.id === departmentFilter;
    const matchesSupplier = !supplierFilter || contract.supplier.id === supplierFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesSupplier;
  });
  
  // Clear all filters
  const clearFilters = () => {
    setStatusFilter(null);
    setDepartmentFilter(null);
    setSupplierFilter(null);
  };
  
  // Handlers for contracts CRUD operations
  const handleAddContract = (data: ContractFormValues) => {
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
  
  // Handlers for opening dialogs with selected contract
  const handleOpenEditDialog = (contract: Contract) => {
    setSelectedContract(contract);
    setIsEditDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (contract: Contract) => {
    setSelectedContract(contract);
    setIsDeleteDialogOpen(true);
  };

  // Get table columns with action handlers
  const columns = getContractTableColumns(handleOpenEditDialog, handleOpenDeleteDialog);

  return (
    <PageTransition>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="space-y-6">
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

          <FilterCard 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            supplierFilter={supplierFilter}
            setSupplierFilter={setSupplierFilter}
            clearFilters={clearFilters}
          />

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
      <DeleteContractDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        contract={selectedContract}
        onDelete={handleDeleteContract}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedContract(null);
        }}
      />
    </PageTransition>
  );
};

export default Contracts;
