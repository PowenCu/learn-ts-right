import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GettingStarted from "./pages/GettingStarted";
import Concepts from "./pages/Concepts";
import TypesPage from "./pages/concepts/TypesPage";
import InterfacesPage from "./pages/concepts/InterfacesPage";
import ClassesPage from "./pages/concepts/ClassesPage";
import GenericsPage from "./pages/concepts/GenericsPage";
import ModulesPage from "./pages/concepts/ModulesPage";
import Advanced from "./pages/Advanced";
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/concepts" element={<Concepts />} />
          <Route path="/concepts/types" element={<TypesPage />} />
          <Route path="/concepts/interfaces" element={<InterfacesPage />} />
          <Route path="/concepts/classes" element={<ClassesPage />} />
          <Route path="/concepts/generics" element={<GenericsPage />} />
          <Route path="/concepts/modules" element={<ModulesPage />} />
          <Route path="/advanced" element={<Advanced />} />
          <Route path="/resources" element={<Resources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
