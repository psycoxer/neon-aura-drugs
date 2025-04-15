import React from 'react';
import { ArrowLeft, Pill, FileText, AlertCircle, Thermometer, Heart, Clock, Shield, Building, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface SideEffect {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  frequency: string;
}

interface Interaction {
  drug: string;
  effect: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Dosage {
  form: string;
  strength: string;
  instructions: string;
  maxDose: string;
}

interface DrugDetailProps {
  drug: {
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
    manufacturer?: string;
    molecules?: string;
    origin?: string;
  };
}

const DrugDetail: React.FC<DrugDetailProps> = ({ drug }) => {
  const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild': return 'bg-green-500/20 text-green-300';
      case 'moderate': return 'bg-amber-500/20 text-amber-300';
      case 'severe': return 'bg-red-500/20 text-red-300';
      default: return 'bg-blue-500/20 text-blue-300';
    }
  };

  const hasInteractions = drug.interactions && drug.interactions.length > 0;
  const hasSideEffects = drug.sideEffects && drug.sideEffects.length > 0;
  const hasDosages = drug.dosages && drug.dosages.length > 0;

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
          {drug.prescriptionRequired && (
            <Badge variant="outline" className="bg-black/20 border-amber-500/50 text-amber-300">
              Prescription Only
            </Badge>
          )}
        </div>
      </div>

      <div className="glass-morphism rounded-xl p-6 border-white/10">
        <p className="text-muted-foreground">{drug.description}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full glass-morphism border-white/10 bg-black/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-neon-purple/20">Overview</TabsTrigger>
          {hasDosages && (
            <TabsTrigger value="dosage" className="data-[state=active]:bg-neon-blue/20">Dosage</TabsTrigger>
          )}
          {hasSideEffects && (
            <TabsTrigger value="sideEffects" className="data-[state=active]:bg-neon-pink/20">Side Effects</TabsTrigger>
          )}
          {hasInteractions && (
            <TabsTrigger value="interactions" className="data-[state=active]:bg-neon-green/20">Interactions</TabsTrigger>
          )}
          <TabsTrigger value="origin" className="data-[state=active]:bg-amber-500/20">Origin</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="glass-morphism rounded-xl p-6 border-white/10 neon-glow-purple">
              <div className="flex items-center mb-4">
                <Pill className="mr-2 text-neon-purple" size={20} />
                <h3 className="text-lg font-medium">Mechanism of Action</h3>
              </div>
              <p className="text-muted-foreground">{drug.mechanismOfAction}</p>
            </div>

            <div className="glass-morphism rounded-xl p-6 border-white/10 neon-glow-blue">
              <div className="flex items-center mb-4">
                <FileText className="mr-2 text-neon-blue" size={20} />
                <h3 className="text-lg font-medium">Indications</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                {drug.indications.map((indication, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{indication}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-morphism rounded-xl p-6 border-white/10 neon-glow-pink">
              <div className="flex items-center mb-4">
                <AlertCircle className="mr-2 text-neon-pink" size={20} />
                <h3 className="text-lg font-medium">Contraindications</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                {drug.contraindications.map((contraindication, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{contraindication}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-morphism rounded-xl p-6 border-white/10 neon-glow-green">
              <div className="flex items-center mb-4">
                <Shield className="mr-2 text-neon-green" size={20} />
                <h3 className="text-lg font-medium">Important Information</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center">
                  <Thermometer className="mr-2 text-neon-blue" size={16} />
                  <span className="font-medium text-white">Pregnancy Category:</span>
                  <span className="ml-2">{drug.pregnancy}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 text-neon-pink" size={16} />
                  <span className="font-medium text-white">Half Life:</span>
                  <span className="ml-2">{drug.halfLife}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="mr-2 text-neon-purple" size={16} />
                  <span className="font-medium text-white">Prescription:</span>
                  <span className="ml-2">{drug.prescriptionRequired ? 'Required' : 'Not Required'}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {hasDosages && (
          <TabsContent value="dosage">
            <div className="space-y-6 mt-6">
              {drug.dosages.map((dosage, i) => (
                <div key={i} className="glass-morphism rounded-xl p-6 border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{dosage.form}</h3>
                      <p className="text-neon-blue font-medium">{dosage.strength}</p>
                    </div>
                    <Badge variant="outline" className="bg-black/20">Max: {dosage.maxDose}</Badge>
                  </div>
                  <Separator className="my-4 bg-white/10" />
                  <p className="text-muted-foreground">{dosage.instructions}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        )}

        {hasSideEffects && (
          <TabsContent value="sideEffects">
            <div className="space-y-4 mt-6">
              <div className="glass-morphism rounded-xl p-6 border-white/10">
                <h3 className="text-lg font-medium mb-4">Reported Side Effects</h3>
                <div className="space-y-3">
                  {drug.sideEffects.map((effect, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span>{effect.name}</span>
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(effect.severity)}>
                          {effect.severity}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{effect.frequency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {hasInteractions && (
          <TabsContent value="interactions">
            <div className="space-y-4 mt-6">
              <div className="glass-morphism rounded-xl p-6 border-white/10">
                <h3 className="text-lg font-medium mb-4">Drug Interactions</h3>
                <div className="space-y-4">
                  {drug.interactions.map((interaction, i) => (
                    <div key={i} className="glass-morphism rounded-lg p-4 border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-neon-blue">{interaction.drug}</h4>
                        <Badge className={getSeverityColor(interaction.severity)}>
                          {interaction.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{interaction.effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="origin">
          <div className="space-y-4 mt-6">
            <div className="glass-morphism rounded-xl p-6 border-white/10">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Manufacturers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {drug.manufacturer ? (
                    <div className="glass-morphism rounded-lg p-4 border-white/5 flex items-center">
                      <Building className="mr-3 text-neon-blue" size={18} />
                      <span>{drug.manufacturer}</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No manufacturer information available</p>
                  )}
                </div>
              </div>
              
              <Separator className="my-4 bg-white/10" />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Molecular Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {drug.molecules ? (
                    <div className="glass-morphism rounded-lg p-4 border-white/5 flex items-center">
                      <TestTube className="mr-3 text-neon-green" size={18} />
                      <span>{drug.molecules}</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No molecular information available</p>
                  )}
                </div>
              </div>
              
              {drug.origin && (
                <>
                  <Separator className="my-4 bg-white/10" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Origin</h3>
                    <div className="glass-morphism rounded-lg p-4 border-white/5">
                      <p className="text-muted-foreground">{drug.origin}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DrugDetail;
