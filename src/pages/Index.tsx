
import React from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import StatCard from '@/components/StatCard';
import DrugCard from '@/components/DrugCard';
import { Database, PlusSquare, Pill, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAllDrugs } from '@/hooks/useDrugs';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { DrugListItem } from '@/types/api';

const Index: React.FC = () => {
  const { data: drugs, isLoading, isError } = useAllDrugs();
  
  const handleSearch = (query: string, filters: string[]) => {
    console.log('Search:', query, 'Filters:', filters);
    toast.info(`Searching for "${query}" with filters: ${filters.join(', ') || 'none'}`);
    // In a real app, this would trigger filtered API calls
  };

  const mapDrugToCard = (drug: DrugListItem) => ({
    id: drug.DrugID.toString(),
    name: drug.Name,
    category: drug.Class || 'Unclassified',
    primaryMolecule: drug.PrimaryMolecule || 'Unknown',
    moleculeCount: drug.MoleculeCount || 0,
    // Add a safety check for Class property when determining warning
    warning: (drug.Class && drug.Class.toLowerCase().includes('nsaid')) || 
             (drug.Class && drug.Class.toLowerCase().includes('opioid')),
    interactions: Math.floor(Math.random() * 20) // Placeholder - the API doesn't provide this info
  });

  const mockDrugs = [
    {
      id: '1',
      name: 'Lipitor',
      category: 'Cardiovascular',
      description: 'Atorvastatin (Lipitor) is used to lower blood cholesterol and reduce the risk of cardiovascular disease.',
      warning: false,
      interactions: 12
    },
    {
      id: '2',
      name: 'Prozac',
      category: 'Antidepressant',
      description: 'Fluoxetine (Prozac) is a selective serotonin reuptake inhibitor (SSRI) used to treat depression, OCD, and panic attacks.',
      warning: true,
      interactions: 25
    },
    {
      id: '3',
      name: 'Amoxicillin',
      category: 'Antibiotic',
      description: 'Amoxicillin is a penicillin antibiotic used to treat bacterial infections in many different parts of the body.',
      warning: false,
      interactions: 8
    },
    {
      id: '4',
      name: 'Ibuprofen',
      category: 'Analgesic',
      description: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation and treat pain or fever.',
      warning: false,
      interactions: 15
    },
    {
      id: '5',
      name: 'Xanax',
      category: 'Anxiolytic',
      description: 'Alprazolam (Xanax) is a benzodiazepine used to treat anxiety disorders and panic disorder.',
      warning: true,
      interactions: 22
    },
    {
      id: '6',
      name: 'Tamiflu',
      category: 'Antiviral',
      description: 'Oseltamivir (Tamiflu) is used to treat symptoms caused by the flu virus. It helps make symptoms less severe and shortens recovery time.',
      warning: false,
      interactions: 6
    }
  ];

  const renderDrugGrid = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading drugs database...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="glass-morphism p-6 text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Could not connect to the API</h3>
          <p className="text-muted-foreground mb-4">
            Displaying mock data instead. Please check if the API server is running at http://localhost:5000.
          </p>
          <Button 
            variant="outline" 
            className="bg-white/5 hover:bg-white/10"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      );
    }

    // Add a safety check before mapping drugs
    const drugData = drugs?.map(mapDrugToCard) || mockDrugs;
    
    return (
      <>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recently Updated</h2>
            <Button variant="link" className="text-neon-purple">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drugData.slice(0, 3).map(drug => (
              <DrugCard key={drug.id} {...drug} />
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-white/5" />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Commonly Searched</h2>
            <Button variant="link" className="text-neon-purple">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drugData.slice(Math.max(0, drugData.length - 3)).map(drug => (
              <DrugCard key={drug.id} {...drug} />
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Drug Database</h1>
            <p className="text-muted-foreground mt-1">Comprehensive information on medications and pharmaceuticals</p>
          </div>
          <Link to="/drug/new">
            <Button className="bg-neon-purple hover:bg-neon-purple/90 self-start">
              <PlusSquare size={16} className="mr-2" />
              New Entry
            </Button>
          </Link>
        </div>

        <SearchBar onSearch={handleSearch} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Drugs" 
            value={drugs ? drugs.length.toString() : "Loading..."} 
            icon={<Database size={20} className="text-neon-purple" />} 
            change={drugs ? { value: "+124 this month", positive: true } : undefined}
            glowColor="purple"
          />
          <StatCard 
            title="Categories" 
            value={drugs ? new Set(drugs.map(d => d.Class || 'Unclassified')).size.toString() : "Loading..."} 
            icon={<Pill size={20} className="text-neon-blue" />}
            glowColor="blue"
          />
          <StatCard 
            title="Interactions" 
            value="5,241" 
            icon={<AlertTriangle size={20} className="text-neon-pink" />}
            change={{ value: "+42 this month", positive: false }}
            glowColor="pink"
          />
          <StatCard 
            title="New Additions" 
            value="347" 
            icon={<PlusSquare size={20} className="text-neon-green" />}
            change={{ value: "+18% vs last month", positive: true }}
            glowColor="green"
          />
        </div>

        {renderDrugGrid()}
      </div>
    </Layout>
  );
};

export default Index;
