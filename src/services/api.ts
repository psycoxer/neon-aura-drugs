import { 
  DrugListItem, 
  DrugFull, 
  DrugCreate, 
  DrugUpdate, 
  Manufacturer, 
  ManufacturerCreate, 
  CreateResponse 
} from '@/types/api';
import { DrugUI, SideEffect } from '@/types/drug';

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
    // First, create the drug
    const drugResponse = await fetch(`${API_URL}/drugs`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({
        Name: drugData.Name,
        Origin: drugData.Origin,
        Class: drugData.Class,
        History: drugData.History,
        SideEffects: drugData.SideEffects,
      }),
    });
    
    const drugResult = await handleResponse(drugResponse);
    const newDrugId = drugResult.DrugID;
    
    // Then, if there are manufacturer IDs, associate them with the drug
    if (drugData.ManufacturerIDs && drugData.ManufacturerIDs.length > 0) {
      try {
        await Promise.all(drugData.ManufacturerIDs.map(manufacturerId => 
          fetch(`${API_URL}/drugs/${newDrugId}/manufacturers`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({ manufacturer_id: manufacturerId }),
          }).then(response => handleResponse(response))
        ));
      } catch (error) {
        console.error('Error associating manufacturers with drug:', error);
        // Continue even if manufacturer association fails
      }
    }
    
    // If there are molecule IDs, associate them with the drug
    if (drugData.MoleculeIDs && drugData.MoleculeIDs.length > 0) {
      try {
        await Promise.all(drugData.MoleculeIDs.map(moleculeId => 
          fetch(`${API_URL}/drugs/${newDrugId}/molecules`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({ molecule_id: moleculeId }),
          }).then(response => handleResponse(response))
        ));
      } catch (error) {
        console.error('Error associating molecules with drug:', error);
        // Continue even if molecule association fails
      }
    }
    
    return drugResult;
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
  // Parse side effects from the string if available
  const parsedSideEffects: SideEffect[] = [];
  if (drug.SideEffects) {
    const sideEffectsArray = drug.SideEffects.split(/[.,;]/).filter(Boolean).map(s => s.trim());
    parsedSideEffects.push(
      ...sideEffectsArray.map(effect => ({
        name: effect,
        severity: (effect.toLowerCase().includes('severe') ? 'severe' : 
                 effect.toLowerCase().includes('mild') ? 'mild' : 'moderate') as "mild" | "moderate" | "severe",
        frequency: 'Not specified'
      }))
    );
  }

  // Create manufacturer info
  const manufacturerName = drug.Manufacturers && drug.Manufacturers.length > 0 
    ? drug.Manufacturers[0].Name 
    : undefined;

  // Create molecule info
  const moleculeInfo = drug.Molecules && drug.Molecules.length > 0 
    ? drug.Molecules.map(m => m.ChemicalFormula).join(', ')
    : undefined;

  return {
    id: drug.DrugID.toString(),
    name: drug.Name,
    category: drug.Class || 'Unclassified',
    description: drug.History || 'No description available for this drug.',
    mechanismOfAction: 'Not specified in API',
    indications: [], // API doesn't provide this information
    contraindications: [], // API doesn't provide this information
    sideEffects: parsedSideEffects.length > 0 ? parsedSideEffects : [
      { name: 'Information not available', severity: 'moderate', frequency: 'N/A' }
    ],
    interactions: [
      { drug: 'Information not available', effect: 'Not specified in API', severity: 'moderate' }
    ],
    dosages: [
      { form: 'Not specified', strength: 'Not specified', instructions: 'Not specified', maxDose: 'Not specified' }
    ],
    pregnancy: 'Not specified in API',
    halfLife: 'Not specified in API',
    prescriptionRequired: false,
    manufacturer: manufacturerName,
    molecules: moleculeInfo,
    origin: drug.Origin || 'Not specified'
  };
};

// Mock data for development when API is unavailable
const mockDrugList: DrugListItem[] = [
  {
    DrugID: 1,
    Name: "Aspirin",
    Class: "NSAID",
    Origin: "Synthetic",
    History: "Aspirin, also known as acetylsalicylic acid (ASA), is a medication used to reduce pain, fever, or inflammation.",
    SideEffects: "Stomach irritation, mild headache, nausea"
  },
  {
    DrugID: 2,
    Name: "Ibuprofen",
    Class: "NSAID",
    Origin: "Synthetic",
    History: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used for relieving pain, helping with fever and reducing inflammation.",
    SideEffects: "Stomach pain, heartburn, dizziness, mild headache"
  },
  {
    DrugID: 3,
    Name: "Paracetamol",
    Class: "Analgesic",
    Origin: "Synthetic",
    History: "Paracetamol, also known as acetaminophen, is a medication used to treat pain and fever.",
    SideEffects: "Rare allergic reactions, severe liver damage with overdose"
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
