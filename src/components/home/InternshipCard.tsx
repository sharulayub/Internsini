import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { Internship } from '../../utils/types';
import { formatRelativeDate, getCompanyInitials } from '../../utils/formatters';
import { Button } from '../common/Button';

interface InternshipCardProps {
  internship: Internship;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const {
    id,
    company,
    position,
    location,
    workType,
    duration,
    postedDate,
  } = internship;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
      <div className="p-6">
        {/* Company Logo and Name */}
        <div className="flex items-center mb-4">
          <div className="mr-3 flex-shrink-0">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-12 h-12 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-md">
                      ${getCompanyInitials(company.name)}
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-md">
                {getCompanyInitials(company.name)}
              </div>
            )}
          </div>
          <div>
            <Link to={`/internship/${id}`} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1">
              {position}
            </Link>
            <p className="text-gray-600 dark:text-gray-400">{company.name}</p>
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Briefcase className="h-4 w-4 mr-2" />
            <span className="text-sm">{workType}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        
        {/* Posted Date and Apply Button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Posted {formatRelativeDate(postedDate)}
          </span>
          <Link to={`/internship/${id}/apply`}>
            <Button variant="primary" size="sm">
              Apply
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};