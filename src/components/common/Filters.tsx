import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersProps {
  locations: string[];
  workTypes: string[];
  durations: string[];
  onFilterChange: (filterType: string, value: string) => void;
  selectedFilters: Record<string, string>;
}

export const Filters: React.FC<FiltersProps> = ({
  locations,
  workTypes,
  durations,
  onFilterChange,
  selectedFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          <Filter size={18} className="mr-2" />
          Filters
        </h3>
        <button 
          onClick={toggleFilters}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {showFilters ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
      </div>
      
      {showFilters && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Filter */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <select
              id="location"
              className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
              value={selectedFilters.location || ''}
              onChange={(e) => onFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          {/* Work Type Filter */}
          <div>
            <label htmlFor="workType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Work Type
            </label>
            <select
              id="workType"
              className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
              value={selectedFilters.workType || ''}
              onChange={(e) => onFilterChange('workType', e.target.value)}
            >
              <option value="">All Work Types</option>
              {workTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          {/* Duration Filter */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration
            </label>
            <select
              id="duration"
              className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
              value={selectedFilters.duration || ''}
              onChange={(e) => onFilterChange('duration', e.target.value)}
            >
              <option value="">All Durations</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {/* Active Filters */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([key, value]) => (
            value && (
              <div key={key} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full flex items-center">
                <span>{key}: {value}</span>
                <button
                  onClick={() => onFilterChange(key, '')}
                  className="ml-1.5 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  <X size={14} />
                </button>
              </div>
            )
          ))}
          <button
            onClick={() => {
              Object.keys(selectedFilters).forEach(key => {
                onFilterChange(key, '');
              });
            }}
            className="text-xs text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};