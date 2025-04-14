
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Placeholder for drug detail page - to be implemented
import DrugDetail from "./components/DrugDetail";

const queryClient = new QueryClient();

// Mock detailed drug data for demonstration
const mockDetailedDrug = {
  id: "1",
  name: "Lipitor",
  category: "Cardiovascular",
  description: "Atorvastatin (Lipitor) is used to lower blood cholesterol and reduce the risk of cardiovascular disease. It works by blocking an enzyme that is needed to make cholesterol in the body.",
  mechanismOfAction: "Atorvastatin is a competitive inhibitor of HMG-CoA reductase, which is the rate-limiting enzyme in cholesterol biosynthesis via the mevalonate pathway.",
  indications: [
    "Hypercholesterolemia (elevated cholesterol levels)",
    "Prevention of cardiovascular disease",
    "Mixed dyslipidemia",
    "Elevated triglyceride levels",
    "Primary prevention of cardiovascular disease"
  ],
  contraindications: [
    "Active liver disease",
    "Pregnancy and breastfeeding",
    "Unexplained persistent elevations of serum transaminases",
    "Hypersensitivity to atorvastatin"
  ],
  sideEffects: [
    { name: "Muscle pain or weakness", severity: "moderate", frequency: "Common (1-10%)" },
    { name: "Headache", severity: "mild", frequency: "Common (1-10%)" },
    { name: "Nausea", severity: "mild", frequency: "Common (1-10%)" },
    { name: "Elevated liver enzymes", severity: "moderate", frequency: "Uncommon (0.1-1%)" },
    { name: "Rhabdomyolysis", severity: "severe", frequency: "Rare (<0.01%)" }
  ],
  interactions: [
    { drug: "Grapefruit juice", effect: "May increase the blood levels of atorvastatin and increase the risk of side effects", severity: "moderate" },
    { drug: "Cyclosporine", effect: "Increases blood levels of atorvastatin, which can lead to muscle breakdown", severity: "severe" },
    { drug: "Gemfibrozil", effect: "Increases the risk of myopathy and rhabdomyolysis", severity: "severe" },
    { drug: "Erythromycin", effect: "May increase the blood levels of atorvastatin", severity: "moderate" }
  ],
  dosages: [
    {
      form: "Tablet",
      strength: "10 mg, 20 mg, 40 mg, 80 mg",
      instructions: "Take orally once daily at any time of day, with or without food.",
      maxDose: "80 mg per day"
    }
  ],
  pregnancy: "Category X - Contraindicated in pregnancy",
  halfLife: "14 hours",
  prescriptionRequired: true
};

// Placeholder component for DetailPage that wraps the DrugDetail component
const DetailPage = () => (
  <div className="container mx-auto px-4 py-8">
    <DrugDetail drug={mockDetailedDrug} />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/drug/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
