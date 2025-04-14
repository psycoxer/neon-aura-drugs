
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import DrugCard from '@/components/DrugCard';
import { useAllDrugs } from '@/hooks/useDrugs';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  const initialFilters = searchParams.get('filters')?.split(',') || [];
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<string[]>(initialFilters);
  
  const { data: drugs, isLoading, isError } = useAllDrugs();
  
  const handleSearch = (query: string, filters: string[]) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.length > 0) params.set('filters', filters.join(','));
    
    navigate({
      pathname: '/search',
      search: params.toString()
    });
  };
  
  const filteredDrugs = React.useMemo(() => {
    if (!drugs) return [];
    
    return drugs.filter(drug => {
      const matchesQuery = searchQuery === '' || 
        drug.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (drug.Class && drug.Class.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilters = activeFilters.length === 0 || 
        (drug.Class && activeFilters.includes(drug.Class.toLowerCase()));
      
      return matchesQuery && matchesFilters;
    });
  }, [drugs, searchQuery, activeFilters]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin w-10 h-10 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading drugs database...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (isError) {
    return (
      <Layout>
        <div className="glass-morphism p-6 text-center max-w-lg mx-auto mt-10">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Error Loading Data</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't connect to the drugs database. This could be due to network issues or the API service may be down.
          </p>
          <div className="flex justify-center gap-3">
            <Button 
              variant="outline" 
              className="bg-white/5 hover:bg-white/10"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
            <Button 
              className="bg-neon-purple hover:bg-neon-purple/90"
              onClick={() => navigate('/')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Search Results</h1>
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-neon-purple hover:text-neon-purple/90 hover:bg-white/5"
          >
            Back to Dashboard
          </Button>
        </div>
        
        <SearchBar onSearch={handleSearch} />
        
        {filteredDrugs.length === 0 ? (
          <div className="glass-morphism p-10 text-center">
            <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any drugs matching your search criteria.
            </p>
            <Button 
              onClick={() => handleSearch('', [])}
              className="bg-neon-purple hover:bg-neon-purple/90"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrugs.map(drug => (
              <DrugCard
                key={drug.DrugID}
                id={drug.DrugID.toString()}
                name={drug.Name}
                category={drug.Class || 'Unclassified'}
                primaryMolecule={drug.PrimaryMolecule || 'Unknown'}
                moleculeCount={drug.MoleculeCount || 0}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
