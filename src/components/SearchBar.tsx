
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string, filters: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const categories = [
    { id: 'antidepressant', label: 'Antidepressant' },
    { id: 'antibiotic', label: 'Antibiotic' },
    { id: 'analgesic', label: 'Analgesic' },
    { id: 'antiviral', label: 'Antiviral' },
    { id: 'cardiovascular', label: 'Cardiovascular' },
  ];

  const handleToggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id]
    );
  };

  const handleSearch = () => {
    onSearch(query, activeFilters);
  };

  const clearSearch = () => {
    setQuery('');
    setActiveFilters([]);
    onSearch('', []);
  };

  return (
    <div className="glass-morphism rounded-xl p-3 flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search drugs by name, category, or symptom..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-black/20 border-white/10 focus-visible:ring-neon-purple"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        {query && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-white"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-black/20 border-white/10 hover:bg-white/10 space-x-1">
              <Filter className="h-4 w-4 mr-1" />
              <span>Filter</span>
              {activeFilters.length > 0 && (
                <span className="ml-1 bg-neon-purple text-white text-xs rounded-full px-2">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-md border-white/10">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category.id}
                checked={activeFilters.includes(category.id)}
                onCheckedChange={() => handleToggleFilter(category.id)}
                className="hover:bg-white/5"
              >
                {category.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button onClick={handleSearch} className="bg-neon-purple hover:bg-neon-purple/90">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
