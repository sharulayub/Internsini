import { useState, useMemo } from 'react';
import { Internship, FilterOptions } from '../utils/types';

export function useFilteredInternships(internships: Internship[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      // Apply search term filter
      if (searchTerm && !internship.position.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !internship.company.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply location filter
      if (filters.location && internship.location !== filters.location) {
        return false;
      }
      
      // Apply work type filter
      if (filters.workType && internship.workType !== filters.workType) {
        return false;
      }
      
      // Apply duration filter
      if (filters.duration && internship.duration !== filters.duration) {
        return false;
      }
      
      return true;
    });
  }, [internships, searchTerm, filters]);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const locations = [...new Set(internships.map(i => i.location))];
    const workTypes = [...new Set(internships.map(i => i.workType))];
    const durations = [...new Set(internships.map(i => i.duration))];
    
    return {
      locations,
      workTypes,
      durations
    };
  }, [internships]);

  return {
    filteredInternships,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filterOptions
  };
}