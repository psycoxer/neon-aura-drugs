
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateDrug, useAllManufacturers } from '@/hooks/useDrugs';
import { DrugCreate, Manufacturer } from '@/types/api';
import { ArrowLeft, PlusSquare, Factory, TestTube } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const NewDrugPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: createDrug, isPending } = useCreateDrug();
  const { data: manufacturers, isLoading: isLoadingManufacturers } = useAllManufacturers();
  const [selectedManufacturers, setSelectedManufacturers] = useState<number[]>([]);
  
  const form = useForm<DrugCreate & { MolecularFormula?: string }>({
    defaultValues: {
      Name: '',
      Origin: '',
      Class: '',
      History: '',
      SideEffects: '',
      MolecularFormula: '',
    },
  });
  
  const onSubmit = (data: DrugCreate & { MolecularFormula?: string }) => {
    // Build base drug data
    const drugData: DrugCreate & { MolecularFormula?: string } = {
      Name: data.Name,
      Origin: data.Origin,
      Class: data.Class,
      History: data.History,
      SideEffects: data.SideEffects,
      ManufacturerIDs: selectedManufacturers.length > 0 ? selectedManufacturers : undefined,
    };

    // Append the molecular formula if present
    if (data.MolecularFormula && data.MolecularFormula.trim().length > 0) {
      // Add as additional property for consumption (e.g., backend/intermediary layer could transform as needed)
      (drugData as any).MolecularFormula = data.MolecularFormula.trim();
    }
    
    createDrug(drugData, {
      onSuccess: (response) => {
        toast.success(`Drug "${data.Name}" created successfully`);
        navigate(`/drug/${response.DrugID}`);
      }
    });
  };

  const handleManufacturerChange = (checked: boolean | string, id: number) => {
    if (checked) {
      setSelectedManufacturers(prev => [...prev, id]);
    } else {
      setSelectedManufacturers(prev => prev.filter(mId => mId !== id));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/" className="text-muted-foreground hover:text-white">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-white">Add New Drug</h1>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-6 border-white/10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drug Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter drug name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The official name of the drug
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="Class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drug Class</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter drug class" {...field} />
                      </FormControl>
                      <FormDescription>
                        The category of the drug (e.g., NSAID, Antibiotic)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter drug origin" {...field} />
                      </FormControl>
                      <FormDescription>
                        The source or origin of the drug
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Molecular Formula Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="MolecularFormula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Molecular Formula <span className="font-normal text-muted-foreground">(optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., C9H8O4" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the drug's main chemical formula if known. Example: <span className="font-mono">C9H8O4</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-4 bg-white/10" />

              <FormField
                control={form.control}
                name="History"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description/History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter drug description and history"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description and history of the drug
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="SideEffects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Side Effects</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter side effects (separate with commas)"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List of side effects separated by commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-4 bg-white/10" />
              
              {/* Manufacturers Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Factory size={20} className="text-neon-blue" />
                  <h3 className="text-lg font-medium">Manufacturers (Optional)</h3>
                </div>
                
                {isLoadingManufacturers ? (
                  <p className="text-muted-foreground">Loading manufacturers...</p>
                ) : manufacturers && manufacturers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {manufacturers.map((manufacturer: Manufacturer) => (
                      <div key={manufacturer.ManufacturerID} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`manufacturer-${manufacturer.ManufacturerID}`}
                          checked={selectedManufacturers.includes(manufacturer.ManufacturerID)}
                          onCheckedChange={(checked) => 
                            handleManufacturerChange(checked, manufacturer.ManufacturerID)
                          }
                        />
                        <label 
                          htmlFor={`manufacturer-${manufacturer.ManufacturerID}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {manufacturer.Name}
                          {manufacturer.FamousFor && (
                            <span className="text-xs text-muted-foreground ml-2">
                              (Famous for: {manufacturer.FamousFor})
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No manufacturers available</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-neon-purple hover:bg-neon-purple/90"
                  disabled={isPending}
                >
                  <PlusSquare size={16} className="mr-2" />
                  {isPending ? 'Adding...' : 'Add Drug'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default NewDrugPage;
