import React from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../../utils/types';
import { getCompanyInitials } from '../../utils/formatters';

interface RelatedListingsProps {
  internships: Internship[];
  currentId: number;
}

export const RelatedListings: React.FC<RelatedListingsProps> = ({ 
  internships,
  currentId 
}) => {
  // Filter out current internship and limit to 3
  const relatedInternships = internships
    .filter(internship => internship.id !== currentId)
    .slice(0, 3);

  if (relatedInternships.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Internships</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedInternships.map(internship => (
          <Link 
            key={internship.id} 
            to={`/internship/${internship.id}`}
            className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex items-center mb-3">
                {internship.company.logo ? (
                  <img 
                    src={internship.company.logo} 
                    alt={`${internship.company.name} logo`} 
                    className="w-10 h-10 object-cover rounded mr-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded mr-3">
                          ${getCompanyInitials(internship.company.name)}
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded mr-3">
                    {getCompanyInitials(internship.company.name)}
                  </div>
                )}
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {internship.company.name}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                {internship.position}
              </h4>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{internship.location}</span>
                <span className="mx-2">•</span>
                <span>{internship.workType}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};