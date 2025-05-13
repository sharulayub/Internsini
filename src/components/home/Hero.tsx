import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock } from 'lucide-react';
import { Button } from '../common/Button';
import { FilterOptions } from '../../utils/types';

interface HeroProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  filterOptions: {
    locations: string[];
    workTypes: string[];
    durations: string[];
  };
}

export const Hero: React.FC<HeroProps> = ({ 
  onSearch, 
  onFilterChange,
  filterOptions 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    onFilterChange(filters);
  };

  const handleFilterChange = (filterName: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-16 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Internships in Malaysia Easily</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover your perfect internship opportunity and kickstart your career journey today
          </p>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for internships, companies..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="py-3">
              Search
            </Button>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline focus:outline-none"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              {showAdvancedSearch ? 'Hide' : 'Show'} Advanced Filters
            </button>
            
            {Object.values(filters).some(value => value && value.length > 0) && (
              <button
                type="button"
                className="text-gray-600 dark:text-gray-400 text-sm hover:underline focus:outline-none"
                onClick={() => {
                  setFilters({});
                  onFilterChange({});
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
          
          {showAdvancedSearch && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                  value={filters.location || ''}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">All Locations</option>
                  {filterOptions.locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Work Type Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                  value={filters.workType || ''}
                  onChange={(e) => handleFilterChange('workType', e.target.value)}
                >
                  <option value="">All Work Types</option>
                  {filterOptions.workTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Duration Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                  value={filters.duration || ''}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <option value="">All Durations</option>
                  {filterOptions.durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};