
import React, { useState } from 'react';
import { useAllDrugs } from '@/hooks/useDrugs';
import Layout from '@/components/Layout';
import DrugCard from '@/components/DrugCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, List, Grid, ArrowLeft, Search } from 'lucide-react';
import { DrugListItem } from '@/types/api';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Link } from 'react-router-dom';

const ViewAllDrugsPage: React.FC = () => {
  const { data: drugs, isLoading, isError } = useAllDrugs();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');

  const itemsPerPage = 12;

  // Map API drug to card props
  const mapDrugToCard = (drug: DrugListItem) => ({
    id: drug.DrugID.toString(),
    name: drug.Name,
    category: drug.Class || 'Unclassified',
    primaryMolecule: drug.PrimaryMolecule || 'Unknown',
    moleculeCount: drug.MoleculeCount || 0,
    warning: (drug.Class && drug.Class.toLowerCase().includes('nsaid')) || 
             (drug.Class && drug.Class.toLowerCase().includes('opioid')),
    interactions: Math.floor(Math.random() * 10) // Placeholder
  });

  // Fallback mock data in case API fails
  const mockDrugs = [
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
    },
    {
      DrugID: 4,
      Name: "Lipitor",
      Class: "Statin",
      MoleculeCount: 1,
      PrimaryMolecule: "C33H35FN2O5"
    },
    {
      DrugID: 5,
      Name: "Prozac",
      Class: "SSRI",
      MoleculeCount: 1,
      PrimaryMolecule: "C17H18F3NO"
    },
    {
      DrugID: 6,
      Name: "Xanax",
      Class: "Benzodiazepine",
      MoleculeCount: 1,
      PrimaryMolecule: "C17H13ClN4"
    }
  ];

  // Filter drugs based on search
  const filteredDrugs = () => {
    const data = drugs || mockDrugs;
    
    if (!searchQuery) return data;
    
    return data.filter(drug => 
      drug.Name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (drug.Class && drug.Class.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Sort drugs
  const sortedDrugs = () => {
    const filtered = filteredDrugs();
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.Name.localeCompare(b.Name);
      } else {
        const classA = a.Class || 'Unclassified';
        const classB = b.Class || 'Unclassified';
        return classA.localeCompare(classB);
      }
    });
  };

  // Paginate drugs
  const paginatedDrugs = () => {
    const sorted = sortedDrugs();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredDrugs().length / itemsPerPage);

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading drugs database...</p>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">All Drugs</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'outline'} 
              size="icon" 
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'outline'} 
              size="icon" 
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drugs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex space-x-4">
            <Tabs defaultValue={sortBy} onValueChange={(value) => setSortBy(value as 'name' | 'category')}>
              <TabsList className="glass-morphism border-white/10 bg-black/20">
                <TabsTrigger value="name" className="data-[state=active]:bg-neon-purple/20">Name</TabsTrigger>
                <TabsTrigger value="category" className="data-[state=active]:bg-neon-purple/20">Category</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
          : "space-y-4"
        }>
          {paginatedDrugs().map((drug) => (
            <DrugCard key={drug.DrugID} {...mapDrugToCard(drug)} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ViewAllDrugsPage;
