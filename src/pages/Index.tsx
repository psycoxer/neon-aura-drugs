
import React from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import StatCard from '@/components/StatCard';
import DrugCard from '@/components/DrugCard';
import { Database, PlusSquare, Pill, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock data - this would be replaced with real API calls
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

const Index: React.FC = () => {
  const handleSearch = (query: string, filters: string[]) => {
    console.log('Search:', query, 'Filters:', filters);
    // In a real app, this would trigger API calls
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Drug Database</h1>
            <p className="text-muted-foreground mt-1">Comprehensive information on medications and pharmaceuticals</p>
          </div>
          <Button className="bg-neon-purple hover:bg-neon-purple/90 self-start">
            <PlusSquare size={16} className="mr-2" />
            New Entry
          </Button>
        </div>

        <SearchBar onSearch={handleSearch} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Drugs" 
            value="12,483" 
            icon={<Database size={20} className="text-neon-purple" />} 
            change={{ value: "+124 this month", positive: true }}
            glowColor="purple"
          />
          <StatCard 
            title="Categories" 
            value="68" 
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

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recently Updated</h2>
            <Button variant="link" className="text-neon-purple">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDrugs.slice(0, 3).map(drug => (
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
            {mockDrugs.slice(3).map(drug => (
              <DrugCard key={drug.id} {...drug} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
