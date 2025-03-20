
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PackageCheck,
  Receipt,
  Users,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Contratos',
    path: '/contracts',
    icon: FileText,
  },
  {
    title: 'Fornecedores',
    path: '/suppliers',
    icon: Briefcase,
  },
  {
    title: 'Pagamentos',
    path: '/payments',
    icon: Receipt,
  },
  {
    title: 'Notas Fiscais',
    path: '/invoices',
    icon: BarChart3,
  },
  {
    title: 'Departamentos',
    path: '/departments',
    icon: Building2,
  },
  {
    title: 'Empenhos',
    path: '/commitments',
    icon: PackageCheck,
  },
  {
    title: 'Usuários',
    path: '/users',
    icon: Users,
  },
];

const SidebarComponent = () => {
  const location = useLocation();
  
  // Skip sidebar on login and register pages
  if (['/login', '/register', '/'].includes(location.pathname)) {
    return null;
  }

  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild active={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default SidebarComponent;
