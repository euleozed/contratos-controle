
import React from 'react';
import { Search, Filter, Building2, FileText, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { departments, suppliers } from '@/lib/data';

interface FilterCardProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
  departmentFilter: string | null;
  setDepartmentFilter: (value: string | null) => void;
  supplierFilter: string | null;
  setSupplierFilter: (value: string | null) => void;
  clearFilters: () => void;
}

const FilterCard: React.FC<FilterCardProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  supplierFilter,
  setSupplierFilter,
  clearFilters,
}) => {
  const hasActiveFilters = statusFilter || departmentFilter || supplierFilter;

  return (
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
  );
};

export default FilterCard;
