
// API Schema Types

// Drug List Item
export interface DrugListItem {
  DrugID: number;
  Name: string;
  Class?: string;
  Origin?: string;
  History?: string;
  SideEffects?: string;
}

// Full Drug Details
export interface DrugFull {
  DrugID: number;
  Name: string;
  Origin?: string;
  Class?: string;
  History?: string;
  SideEffects?: string;
  Molecules: Molecule[];
  Manufacturers: ManufacturerRef[];
  UsageAreas: UsageAreaRef[];
}

// Drug Creation
export interface DrugCreate {
  Name: string;
  Origin?: string;
  Class?: string;
  History?: string;
  SideEffects?: string;
  ManufacturerIDs?: number[]; // Add manufacturer IDs for association
  MoleculeIDs?: number[]; // Add molecule IDs for association
}

// Drug Update
export interface DrugUpdate {
  Name?: string;
  Origin?: string;
  Class?: string;
  History?: string;
  SideEffects?: string;
}

// Manufacturer
export interface Manufacturer {
  ManufacturerID: number;
  Name: string;
  FamousFor?: string;
}

// Manufacturer Creation
export interface ManufacturerCreate {
  Name: string;
  FamousFor?: string;
}

// Manufacturer Reference
export interface ManufacturerRef {
  ManufacturerID: number;
  Name: string;
}

// Molecule
export interface Molecule {
  MoleculeID: number;
  ChemicalFormula: string;
  "3DRendering": string;
}

// Usage Area Reference
export interface UsageAreaRef {
  UsageID: number;
  Region: string;
}

// Create Response
export interface CreateResponse {
  message: string;
  DrugID: number;
}

// Error Response
export interface ErrorResponse {
  error: string;
}
