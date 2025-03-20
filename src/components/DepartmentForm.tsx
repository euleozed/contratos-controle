
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Department } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

interface DepartmentFormProps {
  department?: Department;
  onSubmit: (data: DepartmentFormValues) => void;
  onCancel: () => void;
}

const departmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  manager: z.string().min(1, 'Nome do gestor é obrigatório'),
  budget: z.string().min(1, 'Orçamento é obrigatório'),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  department,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: department
      ? {
          name: department.name,
          description: department.description,
          manager: department.manager,
          budget: department.budget.toString(),
        }
      : undefined,
  });

  const handleSubmit = (data: DepartmentFormValues) => {
    try {
      onSubmit(data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o departamento.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do departamento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gestor</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do gestor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orçamento</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="R$ 0,00" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o departamento"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {department ? 'Atualizar' : 'Cadastrar'} Departamento
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DepartmentForm;
