import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DrugDetailPage from "./pages/DrugDetailPage";
import SearchPage from "./pages/SearchPage";
import ViewAllDrugsPage from "./pages/ViewAllDrugsPage";
import NewDrugPage from "./pages/NewDrugPage";
import EditDrugPage from "./pages/EditDrugPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/drug/:id" element={<DrugDetailPage />} />
          <Route path="/drug/new" element={<NewDrugPage />} />
          <Route path="/drug/:id/edit" element={<EditDrugPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/drugs" element={<ViewAllDrugsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
