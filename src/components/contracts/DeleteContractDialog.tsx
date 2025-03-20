
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Contract } from '@/lib/data';

interface DeleteContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: Contract | null;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteContractDialog: React.FC<DeleteContractDialogProps> = ({
  open,
  onOpenChange,
  contract,
  onDelete,
  onCancel,
}) => {
  if (!contract) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={onDelete}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContractDialog;
