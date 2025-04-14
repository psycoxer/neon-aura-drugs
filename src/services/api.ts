
import { 
  DrugListItem, 
  DrugFull, 
  DrugCreate, 
  DrugUpdate, 
  Manufacturer, 
  ManufacturerCreate, 
  CreateResponse 
} from '@/types/api';
import { DrugUI } from '@/types/drug';

const API_URL = 'http://localhost:5000';

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }
  return response.json();
};

// Common fetch options to handle CORS
const fetchOptions = {
  mode: 'cors' as RequestMode,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'omit' as RequestCredentials,
};

// Drug API
export const drugApi = {
  // Get all drugs
  getAllDrugs: async (): Promise<DrugListItem[]> => {
    try {
      const response = await fetch(`${API_URL}/drugs`, fetchOptions);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching drugs:", error);
      // Return mock data when API fails (for development)
      return mockDrugList;
    }
  },
  
  // Get drug by ID
  getDrugById: async (drugId: number): Promise<DrugFull> => {
    try {
      const response = await fetch(`${API_URL}/drugs/${drugId}`, fetchOptions);
      return handleResponse(response);
    } catch (error) {
      console.error(`Error fetching drug ${drugId}:`, error);
      // Return mock data when API fails (for development)
      return mockDrugDetails;
    }
  },
  
  // Create a new drug
  createDrug: async (drugData: DrugCreate): Promise<CreateResponse> => {
    const response = await fetch(`${API_URL}/drugs`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(drugData),
    });
    return handleResponse(response);
  },
  
  // Update a drug
  updateDrug: async (drugId: number, drugData: DrugUpdate): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}`, {
      ...fetchOptions,
      method: 'PUT',
      body: JSON.stringify(drugData),
    });
    return handleResponse(response);
  },
  
  // Delete a drug
  deleteDrug: async (drugId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}`, {
      ...fetchOptions,
      method: 'DELETE',
    });
    return handleResponse(response);
  },
  
  // Add manufacturer to drug
  addManufacturerToDrug: async (drugId: number, manufacturerId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}/manufacturers`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({ manufacturer_id: manufacturerId }),
    });
    return handleResponse(response);
  },
  
  // Add molecule to drug
  addMoleculeToDrug: async (drugId: number, moleculeId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}/molecules`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({ molecule_id: moleculeId }),
    });
    return handleResponse(response);
  },
};

// Manufacturer API
export const manufacturerApi = {
  // Get all manufacturers
  getAllManufacturers: async (): Promise<Manufacturer[]> => {
    try {
      const response = await fetch(`${API_URL}/manufacturers`, fetchOptions);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      // Return mock data when API fails (for development)
      return mockManufacturers;
    }
  },
  
  // Create a new manufacturer
  createManufacturer: async (manufacturerData: ManufacturerCreate): Promise<CreateResponse> => {
    const response = await fetch(`${API_URL}/manufacturers`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(manufacturerData),
    });
    return handleResponse(response);
  },
};

// API mapping helpers
export const mapDrugFullToUI = (drug: DrugFull): DrugUI => {
  // Transform API drug model to UI model
  return {
    id: drug.DrugID.toString(),
    name: drug.Name,
    category: drug.Class || 'Unclassified',
    description: drug.History || 'No description available',
    mechanismOfAction: 'Information not available in API',
    indications: ['Information not available in API'],
    contraindications: ['Information not available in API'],
    sideEffects: [
      // Parse side effects if available
      { 
        name: drug.SideEffects?.split('.')[0] || 'Unknown', 
        severity: 'moderate' as const, 
        frequency: 'Common' 
      }
    ],
    interactions: [
      // Placeholder until API provides structured interactions
      { 
        drug: 'Unknown', 
        effect: 'Information not available', 
        severity: 'mild' as const 
      }
    ],
    dosages: [
      // Placeholder until API provides structured dosages
      { 
        form: 'Tablet', 
        strength: 'Unknown', 
        instructions: 'Information not available in API',
        maxDose: 'Unknown'
      }
    ],
    pregnancy: 'Information not available in API',
    halfLife: 'Information not available in API',
    prescriptionRequired: false
  };
};

// Mock data for development when API is unavailable
const mockDrugList: DrugListItem[] = [
  {
    DrugID: 1,
    Name: "Aspirin",
    Class: "NSAID",
    MoleculeCount: 1,
    PrimaryMolecule: "C9H8O4"
  },
  {
    DrugID: 2,
    Name: "Ibuprofen",
    Class: "NSAID",
    MoleculeCount: 1,
    PrimaryMolecule: "C13H18O2"
  },
  {
    DrugID: 3,
    Name: "Paracetamol",
    Class: "Analgesic",
    MoleculeCount: 1,
    PrimaryMolecule: "C8H9NO2"
  }
];

const mockDrugDetails: DrugFull = {
  DrugID: 1,
  Name: "Aspirin",
  Origin: "Synthetic",
  Class: "NSAID",
  History: "Aspirin, also known as acetylsalicylic acid (ASA), is a medication used to reduce pain, fever, or inflammation. Specific inflammatory conditions which aspirin is used to treat include Kawasaki disease, pericarditis, and rheumatic fever.",
  SideEffects: "Stomach irritation, nausea, vomiting, heartburn, stomach pain.",
  Molecules: [
    {
      MoleculeID: 1,
      ChemicalFormula: "C9H8O4",
      "3DRendering": "base64encodeddata..."
    }
  ],
  Manufacturers: [
    {
      ManufacturerID: 1,
      Name: "Bayer"
    }
  ],
  UsageAreas: [
    {
      UsageID: 1,
      Region: "Global"
    }
  ],
  Sources: [
    {
      SourceID: 1,
      Name: "Chemical Synthesis",
      Type: "Laboratory"
    }
  ]
};

const mockManufacturers: Manufacturer[] = [
  {
    ManufacturerID: 1,
    Name: "Bayer AG",
    FamousFor: "Aspirin"
  },
  {
    ManufacturerID: 2,
    Name: "Pfizer",
    FamousFor: "Lipitor"
  },
  {
    ManufacturerID: 3,
    Name: "Johnson & Johnson",
    FamousFor: "Tylenol"
  }
];
