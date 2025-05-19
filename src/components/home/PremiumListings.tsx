import React from 'react';
import { Lock } from 'lucide-react';
import { Internship } from '../../utils/types';
import { Button } from '../common/Button';
import { formatRelativeDate, getCompanyInitials } from '../../utils/formatters';

interface PremiumListingsProps {
  internships: Internship[];
  onSubscribe: () => void;
}

export const PremiumListings: React.FC<PremiumListingsProps> = ({
  internships,
  onSubscribe
}) => {
  // Take only the first 3 internships for the preview
  const previewInternships = internships.slice(0, 3);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Internships</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Get early access to the latest opportunities</p>
        </div>
        <Button onClick={onSubscribe}>
          Unlock Premium Access
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previewInternships.map((internship, index) => (
          <div 
            key={internship.id}
            className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${
              index > 0 ? 'opacity-50' : ''
            }`}
          >
            {index > 0 && (
              <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 rounded-lg flex items-center justify-center z-10">
                <Lock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
            )}
            
            <div className="flex items-center mb-4">
              {internship.company.logo ? (
                <img 
                  src={internship.company.logo} 
                  alt={`${internship.company.name} logo`}
                  className="w-12 h-12 rounded-md mr-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-md">
                        ${getCompanyInitials(internship.company.name)}
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-md mr-3">
                  {getCompanyInitials(internship.company.name)}
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{internship.position}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{internship.company.name}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>{internship.location}</p>
              <p>{internship.workType}</p>
              <p>Posted {formatRelativeDate(internship.postedDate)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Premium members get:
        </p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <li>• Early access to new internship postings</li>
          <li>• Exclusive high-paying opportunities</li>
          <li>• Advanced filters and search features</li>
          <li>• Direct application to premium listings</li>
        </ul>
      </div>
    </div>
  );
};