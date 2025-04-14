
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { drugApi, manufacturerApi, mapDrugFullToUI } from '@/services/api';
import { toast } from 'sonner';
import { DrugCreate, DrugUpdate } from '@/types/api';

// Hook for fetching all drugs
export const useAllDrugs = () => {
  return useQuery({
    queryKey: ['drugs'],
    queryFn: drugApi.getAllDrugs,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to fetch drugs: ${error.message || 'Unknown error'}`);
      }
    }
  });
};

// Hook for fetching a single drug
export const useDrugDetails = (drugId: number | undefined) => {
  return useQuery({
    queryKey: ['drug', drugId],
    queryFn: () => drugId ? drugApi.getDrugById(drugId) : Promise.reject('No drug ID provided'),
    enabled: !!drugId,
    retry: 1,
    select: (data) => mapDrugFullToUI(data),
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to fetch drug details: ${error.message || 'Unknown error'}`);
      }
    }
  });
};

// Hook for creating a new drug
export const useCreateDrug = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newDrug: DrugCreate) => drugApi.createDrug(newDrug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drugs'] });
      toast.success("Drug created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create drug: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
};

// Hook for updating a drug
export const useUpdateDrug = (drugId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (drugUpdate: DrugUpdate) => drugApi.updateDrug(drugId, drugUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drugs'] });
      queryClient.invalidateQueries({ queryKey: ['drug', drugId] });
      toast.success("Drug updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update drug: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
};

// Hook for deleting a drug
export const useDeleteDrug = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (drugId: number) => drugApi.deleteDrug(drugId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drugs'] });
      toast.success("Drug deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete drug: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
};

// Hook for fetching all manufacturers
export const useAllManufacturers = () => {
  return useQuery({
    queryKey: ['manufacturers'],
    queryFn: manufacturerApi.getAllManufacturers,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to fetch manufacturers: ${error.message || 'Unknown error'}`);
      }
    }
  });
};
