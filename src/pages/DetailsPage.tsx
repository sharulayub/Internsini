import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BreadcrumbNav } from '../components/details/BreadcrumbNav';
import { CompanyHeader } from '../components/details/CompanyHeader';
import { JobDetails } from '../components/details/JobDetails';
import { RelatedListings } from '../components/details/RelatedListings';
import { Loading } from '../components/common/Loading';
import { mockInternships } from '../data/mockInternships';
import { Internship } from '../utils/types';

export const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching internship details
  useEffect(() => {
    setLoading(true);
    // Simulating API call delay
    const timer = setTimeout(() => {
      if (id) {
        const foundInternship = mockInternships.find(
          internship => internship.id === parseInt(id)
        );
        
        if (foundInternship) {
          setInternship(foundInternship);
          setError(null);
        } else {
          setError('Internship not found');
        }
      } else {
        setError('Invalid internship ID');
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Update page title
  useEffect(() => {
    if (internship) {
      document.title = `${internship.position} at ${internship.company.name} | InternMalaysia`;
    } else {
      document.title = 'Internship Details | InternMalaysia';
    }
  }, [internship]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-6 rounded-lg text-center">
            <p className="text-xl font-medium">{error}</p>
            <p className="mt-2">Please check the URL and try again.</p>
          </div>
        ) : internship && (
          <>
            <BreadcrumbNav 
              companyName={internship.company.name} 
              position={internship.position} 
            />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <CompanyHeader 
                company={internship.company} 
                position={internship.position} 
              />
              
              <JobDetails internship={internship} />
            </div>
            
            <RelatedListings 
              internships={mockInternships} 
              currentId={internship.id} 
            />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};