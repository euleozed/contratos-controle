
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contracts from "./pages/Contracts";
import Profile from "./pages/Profile";
import CommitmentsPage from "./pages/Commitments";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <div className="min-h-screen flex flex-col w-full">
              <Navbar />
              <div className="flex flex-1 w-full">
                <Sidebar />
                <main className="flex-1 overflow-auto bg-gray-50">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/contracts" element={<Contracts />} />
                      <Route path="/commitments" element={<CommitmentsPage />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/suppliers" element={<Navigate to="/dashboard" />} />
                      <Route path="/payments" element={<Navigate to="/dashboard" />} />
                      <Route path="/invoices" element={<Navigate to="/dashboard" />} />
                      <Route path="/departments" element={<Navigate to="/dashboard" />} />
                      <Route path="/users" element={<Navigate to="/dashboard" />} />
                      <Route path="/settings" element={<Navigate to="/dashboard" />} />
                      <Route path="/help" element={<Navigate to="/dashboard" />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AnimatePresence>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
