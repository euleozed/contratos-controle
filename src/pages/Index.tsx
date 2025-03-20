
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, BarChart3, PackageCheck, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container px-4 py-32 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                  Sistema de Controle
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Gestão de Contratos Administrativos
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Simplifique o gerenciamento de contratos, fornecedores, pagamentos 
                e notas fiscais com nossa plataforma completa e intuitiva.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button asChild size="lg" className="gap-2">
                  <Link to="/login">
                    Acessar Sistema <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">Criar Conta</Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1 md:max-w-md lg:max-w-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20 z-0"></div>
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container px-4 py-20 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Funcionalidades Completas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo o que você precisa para gerenciar contratos administrativos em um só lugar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-blue-600" />}
              title="Controle de Contratos"
              description="Gerencie todas as informações dos contratos, datas, valores e status."
              delay={0}
            />
            <FeatureCard 
              icon={<Building2 className="h-10 w-10 text-indigo-600" />}
              title="Gestão de Fornecedores"
              description="Cadastre e gerencie as informações de todos os seus fornecedores."
              delay={0.1}
            />
            <FeatureCard 
              icon={<BarChart3 className="h-10 w-10 text-violet-600" />}
              title="Controle Financeiro"
              description="Acompanhe pagamentos e notas fiscais relacionados aos contratos."
              delay={0.2}
            />
            <FeatureCard 
              icon={<PackageCheck className="h-10 w-10 text-blue-500" />}
              title="Gestão de Empenhos"
              description="Registre e acompanhe os empenhos associados aos contratos."
              delay={0.3}
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Comece a gerenciar seus contratos administrativos agora
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Acesse o sistema e simplifique o controle da sua organização.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link to="/login">
                  Acessar Sistema <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} AdminContracts. Todos os direitos reservados.
                </p>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-gray-500 hover:text-gray-900">Termos</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Privacidade</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Contato</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full transition-all duration-200 hover:shadow-md">
        <CardContent className="pt-6">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Index;
