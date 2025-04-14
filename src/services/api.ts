
import { 
  DrugListItem, 
  DrugFull, 
  DrugCreate, 
  DrugUpdate, 
  Manufacturer, 
  ManufacturerCreate, 
  CreateResponse 
} from '@/types/api';

const API_URL = 'http://localhost:5000';

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred');
  }
  return response.json();
};

// Drug API
export const drugApi = {
  // Get all drugs
  getAllDrugs: async (): Promise<DrugListItem[]> => {
    const response = await fetch(`${API_URL}/drugs`);
    return handleResponse(response);
  },
  
  // Get drug by ID
  getDrugById: async (drugId: number): Promise<DrugFull> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}`);
    return handleResponse(response);
  },
  
  // Create a new drug
  createDrug: async (drugData: DrugCreate): Promise<CreateResponse> => {
    const response = await fetch(`${API_URL}/drugs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drugData),
    });
    return handleResponse(response);
  },
  
  // Update a drug
  updateDrug: async (drugId: number, drugData: DrugUpdate): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drugData),
    });
    return handleResponse(response);
  },
  
  // Delete a drug
  deleteDrug: async (drugId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
  
  // Add manufacturer to drug
  addManufacturerToDrug: async (drugId: number, manufacturerId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}/manufacturers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ manufacturer_id: manufacturerId }),
    });
    return handleResponse(response);
  },
  
  // Add molecule to drug
  addMoleculeToDrug: async (drugId: number, moleculeId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/drugs/${drugId}/molecules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ molecule_id: moleculeId }),
    });
    return handleResponse(response);
  },
};

// Manufacturer API
export const manufacturerApi = {
  // Get all manufacturers
  getAllManufacturers: async (): Promise<Manufacturer[]> => {
    const response = await fetch(`${API_URL}/manufacturers`);
    return handleResponse(response);
  },
  
  // Create a new manufacturer
  createManufacturer: async (manufacturerData: ManufacturerCreate): Promise<CreateResponse> => {
    const response = await fetch(`${API_URL}/manufacturers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(manufacturerData),
    });
    return handleResponse(response);
  },
};

// API mapping helpers
export const mapDrugFullToUI = (drug: DrugFull): any => {
  // Transform API drug model to UI model
  // This is a placeholder - in a real app you'd map API data to UI model
  return {
    id: drug.DrugID.toString(),
    name: drug.Name,
    category: drug.Class,
    description: drug.History.substring(0, 100) + '...',
    mechanismOfAction: 'Information not available in API',
    indications: ['Information not available in API'],
    contraindications: ['Information not available in API'],
    sideEffects: [
      // Placeholder until API provides structured side effects
      { name: drug.SideEffects.split('...')[0] || 'Unknown', severity: 'moderate' as const, frequency: 'Common' }
    ],
    interactions: [
      // Placeholder until API provides structured interactions
      { drug: 'Unknown', effect: 'Information not available', severity: 'mild' as const }
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
