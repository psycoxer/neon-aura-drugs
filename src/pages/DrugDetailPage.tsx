
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DrugDetail from '@/components/DrugDetail';
import { useDrugDetails } from '@/hooks/useDrugs';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const DrugDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const drugId = id !== 'new' ? Number(id) : undefined;
  
  const { data: drug, isLoading, isError, error } = useDrugDetails(drugId);

  if (id === 'new') {
    return (
      <Layout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">New Drug Entry</h1>
          <p className="text-muted-foreground">
            This page would contain a form to create a new drug entry.
          </p>
          {/* In a real application, we would have a form here to create a new drug */}
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin w-10 h-10 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading drug details...</p>
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
          <h3 className="text-xl font-semibold mb-2">Error Loading Drug</h3>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : 'Failed to fetch drug details from API.'}
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

  if (!drug) {
    return (
      <Layout>
        <div className="glass-morphism p-6 text-center max-w-lg mx-auto mt-10">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Drug Not Found</h3>
          <p className="text-muted-foreground mb-4">
            The drug with ID {id} could not be found.
          </p>
          <Button 
            className="bg-neon-purple hover:bg-neon-purple/90"
            onClick={() => navigate('/')}
          >
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <DrugDetail drug={drug} />
    </Layout>
  );
};

export default DrugDetailPage;
