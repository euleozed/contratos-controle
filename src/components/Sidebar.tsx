
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
  CircleDot,
  Settings,
  HelpCircle,
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

const supportItems = [
  {
    title: 'Configurações',
    path: '/settings',
    icon: Settings,
  },
  {
    title: 'Ajuda',
    path: '/help',
    icon: HelpCircle,
  },
];

const SidebarComponent = () => {
  const location = useLocation();
  
  // Skip sidebar on login and register pages
  if (['/login', '/register', '/'].includes(location.pathname)) {
    return null;
  }

  return (
    <SidebarContainer className="bg-white">
      <div className="p-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          SC
        </div>
        <span className="text-lg font-medium">App Contratos</span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={cn(
                      isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600",
                      "hover:bg-blue-50 hover:text-blue-600"
                    )}>
                      <Link to={item.path} className="flex items-center gap-3 py-2 px-4">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                        {isActive && <CircleDot className="h-2 w-2 ml-auto text-blue-600" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
            Suporte
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={cn(
                      isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600",
                      "hover:bg-blue-50 hover:text-blue-600"
                    )}>
                      <Link to={item.path} className="flex items-center gap-3 py-2 px-4">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="p-4 mt-8">
          <div className="rounded-lg border bg-blue-50 border-blue-100 p-4">
            <h4 className="text-sm font-medium text-blue-800">Necessita de ajuda?</h4>
            <p className="text-xs text-blue-600 mt-1">
              Confira nossa documentação para aprender mais sobre o sistema.
            </p>
            <button className="mt-3 text-xs font-medium text-blue-700 hover:text-blue-800 flex items-center">
              Ver documentação
            </button>
          </div>
        </div>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default SidebarComponent;
