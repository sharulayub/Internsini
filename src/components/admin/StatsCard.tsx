import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../common/Card';

interface StatsCardProps {
  title: string;
  value: number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              {change.type === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span 
                className={`text-xs font-medium ${
                  change.type === 'increase' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {change.value}% from last month
              </span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};