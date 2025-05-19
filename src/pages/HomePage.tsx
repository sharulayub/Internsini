import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Hero } from '../components/home/Hero';
import { InternshipGrid } from '../components/home/InternshipGrid';
import { PremiumListings } from '../components/home/PremiumListings';
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

  const handleSubscribe = () => {
    // TODO: Implement subscription flow
    alert('Subscribe to unlock premium features!');
  };

  // Sort internships by date for premium section
  const sortedInternships = [...mockInternships].sort((a, b) => 
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );

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
          {/* Premium Listings Section */}
          <PremiumListings 
            internships={sortedInternships}
            onSubscribe={handleSubscribe}
          />
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {searchTerm || Object.values(filters).some(Boolean) 
              ? `Search Results (${filteredInternships.length})` 
              : 'Free Listings'}
          </h2>
          
          <InternshipGrid internships={filteredInternships} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};