
// Mock data for demonstration purposes

import { format } from "date-fns";

// Helper function to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Suppliers
export interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export const suppliers: Supplier[] = [
  {
    id: generateId(),
    name: "Tech Solutions Ltda",
    cnpj: "12.345.678/0001-90",
    contact: "João Silva",
    email: "contato@techsolutions.com",
    phone: "(11) 98765-4321",
    address: "Av. Paulista, 1000, São Paulo, SP",
    createdAt: format(new Date(2022, 1, 15), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    name: "Construções ABC S.A.",
    cnpj: "98.765.432/0001-10",
    contact: "Maria Oliveira",
    email: "contato@construcoes.com",
    phone: "(11) 91234-5678",
    address: "Rua Augusta, 500, São Paulo, SP",
    createdAt: format(new Date(2022, 3, 20), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    name: "Serviços Gerais Ltda",
    cnpj: "45.678.901/0001-23",
    contact: "Pedro Santos",
    email: "contato@servicosgerais.com",
    phone: "(11) 93456-7890",
    address: "Av. Brigadeiro Faria Lima, 1500, São Paulo, SP",
    createdAt: format(new Date(2022, 5, 10), "yyyy-MM-dd"),
  },
];

// Departments
export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  budget: number;
  createdAt: string;
}

export const departments: Department[] = [
  {
    id: generateId(),
    name: "Tecnologia da Informação",
    description: "Responsável pela infraestrutura de TI e sistemas",
    manager: "Carlos Mendes",
    budget: 1500000,
    createdAt: format(new Date(2022, 0, 5), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    name: "Infraestrutura",
    description: "Responsável por construções e manutenções",
    manager: "Ana Ferreira",
    budget: 3000000,
    createdAt: format(new Date(2022, 0, 10), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    name: "Administrativo",
    description: "Responsável pelos processos administrativos",
    manager: "Renato Alves",
    budget: 1000000,
    createdAt: format(new Date(2022, 0, 15), "yyyy-MM-dd"),
  },
];

// Contract types
export type ContractType = 
  | "Credenciamento"
  | "Dispensa em Razão do Valor"
  | "Emergencial"
  | "Inexigibilidade"
  | "Licitatório"
  | "Dispensa - Locação de Imóveis";

// Contracts
export interface Contract {
  id: string;
  number: string;
  processNumber?: string;
  supplier: Supplier;
  department: Department;
  value: number;
  monthlyValue?: number;
  contractType?: ContractType;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending' | 'canceled';
  object?: string;
  description: string;
  createdAt: string;
}

export const contracts: Contract[] = [
  {
    id: generateId(),
    number: "2023/001",
    processNumber: "PROC-2023/001",
    supplier: suppliers[0],
    department: departments[0],
    value: 250000,
    monthlyValue: 20833,
    contractType: "Licitatório",
    startDate: format(new Date(2023, 1, 1), "yyyy-MM-dd"),
    endDate: format(new Date(2024, 1, 1), "yyyy-MM-dd"),
    status: "active",
    object: "Manutenção preventiva e corretiva de servidores e infraestrutura de TI",
    description: "Contrato de manutenção de servidores e equipamentos de TI incluindo suporte 24/7",
    createdAt: format(new Date(2023, 0, 15), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    number: "2023/002",
    processNumber: "PROC-2023/002",
    supplier: suppliers[1],
    department: departments[1],
    value: 750000,
    monthlyValue: 62500,
    contractType: "Licitatório",
    startDate: format(new Date(2023, 2, 1), "yyyy-MM-dd"),
    endDate: format(new Date(2023, 11, 31), "yyyy-MM-dd"),
    status: "active",
    object: "Construção e reforma da nova sede administrativa",
    description: "Construção de nova sede administrativa incluindo serviços de alvenaria, hidráulica e elétrica",
    createdAt: format(new Date(2023, 1, 20), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    number: "2023/003",
    processNumber: "PROC-2023/003",
    supplier: suppliers[2],
    department: departments[2],
    value: 120000,
    monthlyValue: 10000,
    contractType: "Dispensa em Razão do Valor",
    startDate: format(new Date(2023, 3, 1), "yyyy-MM-dd"),
    endDate: format(new Date(2023, 9, 30), "yyyy-MM-dd"),
    status: "expired",
    object: "Serviços de limpeza e manutenção predial",
    description: "Serviços de limpeza e copa para o edifício sede",
    createdAt: format(new Date(2023, 2, 15), "yyyy-MM-dd"),
  },
];

// Payments
export interface Payment {
  id: string;
  contract: Contract;
  amount: number;
  date: string;
  document: string;
  description: string;
  createdAt: string;
}

export const payments: Payment[] = [
  {
    id: generateId(),
    contract: contracts[0],
    amount: 62500,
    date: format(new Date(2023, 4, 5), "yyyy-MM-dd"),
    document: "PAG2023001",
    description: "Primeiro trimestre 2023",
    createdAt: format(new Date(2023, 4, 5), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    contract: contracts[0],
    amount: 62500,
    date: format(new Date(2023, 7, 10), "yyyy-MM-dd"),
    document: "PAG2023002",
    description: "Segundo trimestre 2023",
    createdAt: format(new Date(2023, 7, 10), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    contract: contracts[1],
    amount: 250000,
    date: format(new Date(2023, 5, 15), "yyyy-MM-dd"),
    document: "PAG2023003",
    description: "Primeira fase da construção",
    createdAt: format(new Date(2023, 5, 15), "yyyy-MM-dd"),
  },
];

// Invoices
export interface Invoice {
  id: string;
  contract: Contract;
  number: string;
  issueDate: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'partial';
  description: string;
  createdAt: string;
}

export const invoices: Invoice[] = [
  {
    id: generateId(),
    contract: contracts[0],
    number: "NF00123",
    issueDate: format(new Date(2023, 3, 30), "yyyy-MM-dd"),
    amount: 62500,
    status: "paid",
    description: "Fatura referente ao primeiro trimestre",
    createdAt: format(new Date(2023, 3, 30), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    contract: contracts[0],
    number: "NF00456",
    issueDate: format(new Date(2023, 6, 30), "yyyy-MM-dd"),
    amount: 62500,
    status: "paid",
    description: "Fatura referente ao segundo trimestre",
    createdAt: format(new Date(2023, 6, 30), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    contract: contracts[1],
    number: "NF00789",
    issueDate: format(new Date(2023, 4, 30), "yyyy-MM-dd"),
    amount: 250000,
    status: "paid",
    description: "Fatura primeira fase da construção",
    createdAt: format(new Date(2023, 4, 30), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    contract: contracts[1],
    number: "NF00790",
    issueDate: format(new Date(2023, 8, 30), "yyyy-MM-dd"),
    amount: 250000,
    status: "unpaid",
    description: "Fatura segunda fase da construção",
    createdAt: format(new Date(2023, 8, 30), "yyyy-MM-dd"),
  },
];

// Commitments (Empenhos)
export interface Commitment {
  id: string;
  number: string;
  contract: Contract;
  amount: number;
  date: string;
  description: string;
  createdAt: string;
}

export const commitments: Commitment[] = [
  {
    id: generateId(),
    number: "EMP2023001",
    contract: contracts[0],
    amount: 250000,
    date: format(new Date(2023, 0, 20), "yyyy-MM-dd"),
    description: "Empenho para contrato de manutenção de servidores",
    createdAt: format(new Date(2023, 0, 20), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    number: "EMP2023002",
    contract: contracts[1],
    amount: 750000,
    date: format(new Date(2023, 1, 25), "yyyy-MM-dd"),
    description: "Empenho para construção de sede administrativa",
    createdAt: format(new Date(2023, 1, 25), "yyyy-MM-dd"),
  },
  {
    id: generateId(),
    number: "EMP2023003",
    contract: contracts[2],
    amount: 120000,
    date: format(new Date(2023, 2, 20), "yyyy-MM-dd"),
    description: "Empenho para serviços de limpeza e copa",
    createdAt: format(new Date(2023, 2, 20), "yyyy-MM-dd"),
  },
];
