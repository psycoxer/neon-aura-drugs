
import { ManufacturerRef, Molecule } from './api';

// UI Related Types
export interface DrugUI {
  id: string;
  name: string;
  category: string;
  description: string;
  origin?: string;
  sideEffects: string[];
  manufacturers?: ManufacturerRef[];
  molecules?: Molecule[];
}
