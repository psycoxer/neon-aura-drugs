
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle, ArrowRight, Edit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export interface DrugCardProps {
  id: string;
  name: string;
  category: string;
  primaryMolecule?: string;
  moleculeCount?: number;
  description?: string;
  warning?: boolean;
  interactions?: number;
  onDelete?: (id: string) => void;
}

const DrugCard: React.FC<DrugCardProps> = ({
  id,
  name,
  category,
  description,
  primaryMolecule,
  moleculeCount,
  warning = false,
  interactions = 0,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Create a description based on either the provided description or molecule information
  const cardDescription = description ||
    (primaryMolecule ?
      `Primary molecule: ${primaryMolecule}${moleculeCount ? `. This drug contains ${moleculeCount} active molecules.` : ''}` :
      'No description available');

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <Card className="glass-morphism overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/10 border-white/10 relative">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-neon-purple transition-colors">{name}</h3>
            <Badge variant="outline" className="mt-1 bg-black/20">{category}</Badge>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              {/* Edit Icon */}
              <Link
                to={`/drug/${id}/edit`}
                className={cn(
                  "rounded-full bg-black/20 hover:bg-neon-purple/90 text-white/80 hover:text-white p-1 transition",
                  "shadow hover:shadow-neon-purple/30"
                )}
                aria-label="Edit drug"
                title="Edit"
                onClick={e => e.stopPropagation()}
                tabIndex={0}
              >
                <Edit size={20} />
              </Link>
              {/* Delete Icon */}
              {onDelete && (
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <button
                      className={cn(
                        "rounded-full bg-black/20 hover:bg-red-600/90 text-white/80 hover:text-white p-1 transition",
                        "shadow hover:shadow-red-500/30"
                      )}
                      aria-label="Delete drug"
                      title="Delete"
                      tabIndex={0}
                      onClick={e => {
                        e.stopPropagation();
                        setDeleteDialogOpen(true);
                      }}
                      type="button"
                    >
                      <Trash2 size={20} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Drug</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete <b>{name}</b>? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={handleDelete}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            {warning && (
              <div className="text-amber-500 animate-pulse-glow mt-2">
                <AlertCircle size={18} />
              </div>
            )}
          </div>
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
