import React from 'react';
import { Company } from '../../utils/types';
import { getCompanyInitials } from '../../utils/formatters';

interface CompanyHeaderProps {
  company: Company;
  position: string;
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company, position }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
      <div className="mr-0 sm:mr-6 mb-4 sm:mb-0">
        {company.logo ? (
          <img 
            src={company.logo} 
            alt={`${company.name} logo`} 
            className="w-20 h-20 object-cover rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="w-20 h-20 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-2xl font-bold rounded-md">
                  ${getCompanyInitials(company.name)}
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-2xl font-bold rounded-md">
            {getCompanyInitials(company.name)}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {position}
        </h1>
        <div className="flex items-center">
          <span className="text-lg text-gray-700 dark:text-gray-300">
            {company.name}
          </span>
        </div>
      </div>
    </div>
  );
};