import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BreadcrumbNav } from '../components/details/BreadcrumbNav';
import { Loading } from '../components/common/Loading';
import { Button } from '../components/common/Button';
import { mockInternships } from '../data/mockInternships';
import { Internship } from '../utils/types';
import { formatDescription } from '../utils/formatters';

export const ApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
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

  useEffect(() => {
    if (internship) {
      document.title = `Apply: ${internship.position} at ${internship.company.name} | InternMalaysia`;
    }
  }, [internship]);

  if (loading) return <Loading />;
  if (error || !internship) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-6 rounded-lg text-center">
        <p className="text-xl font-medium">{error}</p>
        <p className="mt-2">Please check the URL and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BreadcrumbNav 
          companyName={internship.company.name} 
          position={internship.position} 
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {internship.position} at {internship.company.name}
          </h1>

          <div className="space-y-8">
            {/* Position Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Location</span>
                <p className="font-medium text-gray-900 dark:text-white">{internship.location}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Work Type</span>
                <p className="font-medium text-gray-900 dark:text-white">{internship.workType}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Duration</span>
                <p className="font-medium text-gray-900 dark:text-white">{internship.duration}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Company</span>
                <p className="font-medium text-gray-900 dark:text-white">{internship.company.name}</p>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Job Description</h2>
              <div 
                className="prose prose-blue dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formatDescription(internship.description) }}
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={() => window.location.href = internship.applicationUrl}>
                Apply Now
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/internship/${id}`)}
              >
                Back to Details
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};