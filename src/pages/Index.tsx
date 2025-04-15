import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllDrugs } from '@/hooks/useDrugs';
import { Pill, Search, Database, PlusCircle, ArrowRight, AlertTriangle } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: drugsData, isLoading, isError } = useAllDrugs();

  // Map for recent drugs
  const recentDrugs = drugsData?.slice(0, 4).map(drug => ({
    id: drug.DrugID,
    name: drug.Name,
    category: drug.Class || 'Unclassified',
    description: drug.History || 'No description available',
  })) || [];

  // Filter drugs based on search query
  const filteredDrugs = drugsData?.filter(drug => 
    drug.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (drug.Class && drug.Class.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5) || [];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pharmaceutical Database</h1>
            <p className="text-muted-foreground">
              Explore and manage pharmaceutical drug information
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/drug/new">
              <Button className="bg-neon-purple hover:bg-neon-purple/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Drug
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drugs by name or class..."
            className="pl-8 bg-white/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && filteredDrugs.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-black/90 border border-white/10 shadow-lg">
              <ul className="py-1">
                {filteredDrugs.map((drug) => (
                  <li key={drug.DrugID} className="px-3 py-2 hover:bg-white/5">
                    <Link to={`/drug/${drug.DrugID}`} className="block">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-white">{drug.Name}</span>
                          {drug.Class && (
                            <span className="ml-2 text-xs text-muted-foreground">{drug.Class}</span>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  </li>
                ))}
                {filteredDrugs.length > 4 && (
                  <li className="px-3 py-2 text-center text-sm text-muted-foreground">
                    <Link to="/search" className="hover:text-neon-purple">
                      View all results
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="recent" className="data-[state=active]:bg-neon-purple/20">
              Recent Drugs
            </TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-neon-blue/20">
              Quick Actions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Recently Added Drugs</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading drugs...</p>
                </div>
              </div>
            ) : isError ? (
              <div className="glass-morphism p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Error Loading Drugs</h3>
                <p className="text-muted-foreground mb-4">
                  Failed to fetch drug data from API.
                </p>
                <Button 
                  variant="outline" 
                  className="bg-white/5 hover:bg-white/10"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : recentDrugs.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {recentDrugs.map((drug) => (
                  <Card key={drug.id} className="bg-black/40 border-white/5 hover:border-white/10 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{drug.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Pill className="mr-1 h-3 w-3" />
                        {drug.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {drug.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link to={`/drug/${drug.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="glass-morphism p-6 text-center">
                <Database className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Drugs Found</h3>
                <p className="text-muted-foreground mb-4">
                  There are no drugs in the database yet.
                </p>
                <Button asChild>
                  <Link to="/drug/new">Add Your First Drug</Link>
                </Button>
              </div>
            )}
            
            {recentDrugs.length > 0 && (
              <div className="flex justify-center mt-4">
                <Button variant="outline" asChild>
                  <Link to="/drugs">View All Drugs</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-black/40 border-white/5">
                <CardHeader>
                  <CardTitle>Add New Drug</CardTitle>
                  <CardDescription>
                    Create a new drug entry in the database
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Add detailed information about a pharmaceutical drug including its classification, 
                    side effects, and manufacturer details.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-neon-purple hover:bg-neon-purple/90" asChild>
                    <Link to="/drug/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Drug
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/40 border-white/5">
                <CardHeader>
                  <CardTitle>Advanced Search</CardTitle>
                  <CardDescription>
                    Find drugs with specific criteria
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Search for drugs by name, classification, manufacturer, or other properties 
                    with advanced filtering options.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-neon-blue hover:bg-neon-blue/90" asChild>
                    <Link to="/search">
                      <Search className="mr-2 h-4 w-4" />
                      Advanced Search
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
