
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface DrugCardProps {
  id: string;
  name: string;
  category: string;
  primaryMolecule?: string;
  moleculeCount?: number;
  description?: string;
  warning?: boolean;
  interactions?: number;
}

const DrugCard: React.FC<DrugCardProps> = ({
  id,
  name,
  category,
  description,
  primaryMolecule,
  moleculeCount,
  warning = false,
  interactions = 0
}) => {
  // Create a description based on either the provided description or molecule information
  const cardDescription = description || 
    (primaryMolecule ? 
      `Primary molecule: ${primaryMolecule}${moleculeCount ? `. This drug contains ${moleculeCount} active molecules.` : ''}` : 
      'No description available');

  return (
    <Card className="glass-morphism overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/10 border-white/10">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-neon-purple transition-colors">{name}</h3>
            <Badge variant="outline" className="mt-1 bg-black/20">{category}</Badge>
          </div>
          {warning && (
            <div className="text-amber-500 animate-pulse-glow">
              <AlertCircle size={18} />
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{cardDescription}</p>
        
        <div className="flex justify-between items-center">
          {interactions > 0 ? (
            <span className="text-xs text-muted-foreground">
              {interactions} known interaction{interactions !== 1 ? 's' : ''}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">No known interactions</span>
          )}
          
          <Link 
            to={`/drug/${id}`} 
            className={cn(
              "text-neon-purple flex items-center text-sm font-medium",
              "transition-all duration-300 group-hover:translate-x-1"
            )}
          >
            View details 
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default DrugCard;
