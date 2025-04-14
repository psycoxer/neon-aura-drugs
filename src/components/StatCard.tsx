
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  glowColor?: 'purple' | 'blue' | 'pink' | 'green';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  className,
  glowColor = 'purple'
}) => {
  const glowClasses = {
    purple: 'neon-glow-purple',
    blue: 'neon-glow-blue',
    pink: 'neon-glow-pink',
    green: 'neon-glow-green'
  };

  return (
    <Card className={cn(
      "glass-morphism border-white/10 p-6 animate-float",
      glowClasses[glowColor],
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p className={cn(
              "text-xs font-medium mt-1 flex items-center",
              change.positive ? "text-neon-green" : "text-red-500"
            )}>
              {change.positive ? "↑" : "↓"} {change.value}
            </p>
          )}
        </div>
        <div className="p-2 rounded-full bg-white/5">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
