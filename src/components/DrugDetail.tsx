
import React from 'react';
import { ArrowLeft, Pill, FileText, Building, TestTube, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { DrugFull, ManufacturerRef, Molecule } from '@/types/api';

interface DrugDetailProps {
  drug: {
    id: string;
    name: string;
    category: string;
    description: string;
    origin?: string;
    sideEffects: string;
    manufacturers?: ManufacturerRef[];
    molecules?: Molecule[];
  };
}

const DrugDetail: React.FC<DrugDetailProps> = ({ drug }) => {
  const hasSideEffects = drug.sideEffects && drug.sideEffects.length > 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/" className="text-muted-foreground hover:text-white">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">{drug.name}</h1>
          <Badge variant="outline" className="bg-black/20 border-neon-purple/50 text-neon-purple">
            {drug.category}
          </Badge>
        </div>
      </div>

      <div className="glass-morphism rounded-xl p-6 border-white/10">
        <p className="text-muted-foreground">{drug.description}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full glass-morphism border-white/10 bg-black/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-neon-purple/20">Overview</TabsTrigger>
          {hasSideEffects && (
            <TabsTrigger value="sideEffects" className="data-[state=active]:bg-neon-pink/20">Side Effects</TabsTrigger>
          )}
          <TabsTrigger value="details" className="data-[state=active]:bg-amber-500/20">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="glass-morphism rounded-xl p-6 border-white/10 neon-glow-purple">
              <div className="flex items-center mb-4">
                <Pill className="mr-2 text-neon-purple" size={20} />
                <h3 className="text-lg font-medium">Classification</h3>
              </div>
              <p className="text-muted-foreground">{drug.category || 'Not specified'}</p>
            </div>

            <div className="glass-morphism rounded-xl p-6 border-white/10 neon-glow-blue">
              <div className="flex items-center mb-4">
                <FileText className="mr-2 text-neon-blue" size={20} />
                <h3 className="text-lg font-medium">Origin</h3>
              </div>
              <p className="text-muted-foreground">{drug.origin || 'Not specified'}</p>
            </div>
          </div>
        </TabsContent>

        {hasSideEffects && (
          <TabsContent value="sideEffects">
            <div className="space-y-4 mt-6">
              <div className="glass-morphism rounded-xl p-6 border-white/10">
                <h3 className="text-lg font-medium mb-4">Side Effects</h3>
                <p className="text-muted-foreground">{drug.sideEffects}</p>
              </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="details">
          <div className="space-y-4 mt-6">
            <div className="glass-morphism rounded-xl p-6 border-white/10">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Manufacturers</h3>
                {drug.manufacturers && drug.manufacturers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {drug.manufacturers.map((manufacturer) => (
                      <div 
                        key={manufacturer.ManufacturerID} 
                        className="glass-morphism rounded-lg p-4 border-white/5 flex items-center"
                      >
                        <Building className="mr-3 text-neon-blue" size={18} />
                        <span>{manufacturer.Name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No manufacturer information available</p>
                )}
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Molecular Information</h3>
                {drug.molecules && drug.molecules.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {drug.molecules.map((molecule) => (
                      <div 
                        key={molecule.MoleculeID} 
                        className="glass-morphism rounded-lg p-4 border-white/5 flex items-center"
                      >
                        <TestTube className="mr-3 text-neon-green" size={18} />
                        <span>{molecule.ChemicalFormula}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No molecular information available</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DrugDetail;
