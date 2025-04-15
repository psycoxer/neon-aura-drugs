
// UI Related Types

export interface SideEffect {
  name: string;
  severity: "mild" | "moderate" | "severe";
  frequency: string;
}

export interface Interaction {
  drug: string;
  effect: string;
  severity: "mild" | "moderate" | "severe";
}

export interface Dosage {
  form: string;
  strength: string;
  instructions: string;
  maxDose: string;
}

export interface DrugUI {
  id: string;
  name: string;
  category: string;
  description: string;
  mechanismOfAction: string;
  indications: string[];
  contraindications: string[];
  sideEffects: SideEffect[];
  interactions: Interaction[];
  dosages: Dosage[];
  pregnancy: string;
  halfLife: string;
  prescriptionRequired: boolean;
  // API data fields
  manufacturer?: string;
  molecules?: string;
  origin?: string;
}
