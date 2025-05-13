import React from 'react';
import { Internship } from '../../utils/types';
import { InternshipCard } from './InternshipCard';
import { Loading } from '../common/Loading';

interface InternshipGridProps {
  internships: Internship[];
  loading?: boolean;
  error?: string;
}

export const InternshipGrid: React.FC<InternshipGridProps> = ({ 
  internships,
  loading = false,
  error
}) => {
  if (loading) {
    return <Loading type="skeleton" />;
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No internships found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {internships.map(internship => (
        <InternshipCard key={internship.id} internship={internship} />
      ))}
    </div>
  );
};