
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext"; 
import Index from "./pages/Index";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Tarot from "./pages/Tarot";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthVerify from "./pages/AuthVerify";
import Onboarding from "./pages/Onboarding";
import WealthMap from "./pages/WealthMap";
import Community from "./pages/Community";
import Maps from "./pages/Maps";
import CareerMap from "./pages/CareerMap";
import LoveMap from "./pages/LoveMap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <div className="max-h-screen overflow-auto">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/verify" element={<AuthVerify />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/home" element={<Home />} />
                <Route path="/calendario" element={<Calendar />} />
                <Route path="/tarot" element={<Tarot />} />
                <Route path="/aprender" element={<Home />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/mapas" element={<Maps />} />
                <Route path="/riqueza" element={<WealthMap />} />
                <Route path="/carrera" element={<CareerMap />} />
                <Route path="/amor" element={<LoveMap />} />
                <Route path="/comunidad" element={<Community />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
