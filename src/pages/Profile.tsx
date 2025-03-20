
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Lock, Camera, PenSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Nome deve ter pelo menos 2 caracteres.',
    })
    .max(30, {
      message: 'Nome não pode ter mais de 30 caracteres.',
    }),
  email: z
    .string()
    .min(1, { message: 'Este campo é obrigatório' })
    .email('Email inválido'),
  bio: z.string().max(160).optional(),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme sua nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [selectedTab, setSelectedTab] = useState('profile');
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      avatarUrl: user?.avatarUrl || '',
    },
  });
  
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
      });
      
      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar seu perfil.',
        variant: 'destructive',
      });
    }
  };
  
  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      // In a real application, you would send this data to your backend
      // For this demo, we'll just simulate a successful password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      passwordForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi alterada com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar sua senha.',
        variant: 'destructive',
      });
    }
  };

  return (
    <PageTransition>
      <div className="container max-w-5xl px-4 py-10 mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações de perfil e senha.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="profile" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Senha</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações do Perfil</CardTitle>
                      <CardDescription>
                        Atualize suas informações de perfil.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                          <AvatarFallback className="text-2xl">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Camera className="h-4 w-4" />
                            <span>Alterar foto</span>
                          </Button>
                        </div>
                      </div>
                      
                      <Form {...profileForm}>
                        <form 
                          onSubmit={profileForm.handleSubmit(onProfileSubmit)} 
                          className="space-y-6"
                        >
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                  <Input placeholder="Seu nome" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="seu@email.com" 
                                    type="email" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Biografia</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Uma breve descrição sobre você" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Máximo de 160 caracteres.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button type="submit">Salvar Alterações</Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Alterar Senha</CardTitle>
                      <CardDescription>
                        Atualize sua senha para manter sua conta segura.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Form {...passwordForm}>
                        <form 
                          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} 
                          className="space-y-6"
                        >
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha Atual</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="••••••••" 
                                    type="password" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nova Senha</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="••••••••" 
                                    type="password" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Mínimo de 6 caracteres.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirmar Nova Senha</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="••••••••" 
                                    type="password" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button type="submit">Atualizar Senha</Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
