import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Hero } from '../components/home/Hero';
import { InternshipGrid } from '../components/home/InternshipGrid';
import { mockInternships } from '../data/mockInternships';
import { useFilteredInternships } from '../hooks/useFilteredInternships';
import { FilterOptions } from '../utils/types';

export const HomePage: React.FC = () => {
  const { 
    filteredInternships,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filterOptions
  } = useFilteredInternships(mockInternships);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow">
        <Hero 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
        />
        
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {searchTerm || Object.values(filters).some(Boolean) 
              ? `Search Results (${filteredInternships.length})` 
              : 'Latest Internships'}
          </h2>
          
          <InternshipGrid internships={filteredInternships} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};