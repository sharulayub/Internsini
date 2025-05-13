import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Calendar, AlertTriangle, BarChart2, Briefcase } from 'lucide-react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { DataTable } from '../components/admin/DataTable';
import { StatsCard } from '../components/admin/StatsCard';
import { StatusIndicator } from '../components/admin/StatusIndicator';
import { Pagination } from '../components/admin/Pagination';
import { mockInternships } from '../data/mockInternships';
import { Button } from '../components/common/Button';

export const AdminPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate total pages
  const totalPages = Math.ceil(mockInternships.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInternships = mockInternships.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Mock handlers
  const handleView = (id: number) => {
    window.open(`/internship/${id}`, '_blank');
  };
  
  const handleEdit = (id: number) => {
    console.log('Edit internship with id:', id);
  };
  
  const handleDelete = (id: number) => {
    console.log('Delete internship with id:', id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Link to="/admin/new">
              <Button>
                Add New Internship
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Internships"
            value={mockInternships.length}
            change={{ value: 12, type: 'increase' }}
            icon={<FileText className="h-6 w-6 text-blue-500" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          />
          <StatsCard
            title="Active Internships"
            value={mockInternships.length - 2}
            change={{ value: 8, type: 'increase' }}
            icon={<Briefcase className="h-6 w-6 text-green-500" />}
            color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
          />
          <StatsCard
            title="Expired Internships"
            value={2}
            change={{ value: 5, type: 'decrease' }}
            icon={<Calendar className="h-6 w-6 text-red-500" />}
            color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
          />
        </div>
        
        {/* System Status */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <StatusIndicator 
            status="healthy" 
            name="Database" 
            message="Connection established and performing optimally" 
          />
          <StatusIndicator 
            status="healthy" 
            name="API" 
            message="All endpoints operational" 
          />
          <StatusIndicator 
            status="warning" 
            name="Storage" 
            message="75% capacity reached - consider cleanup" 
          />
          <StatusIndicator 
            status="healthy" 
            name="Security" 
            message="No threats detected" 
          />
        </div>
        
        {/* Internship Management */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Internship Management</h2>
        <DataTable 
          internships={currentInternships}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        {/* Pagination */}
        <div className="mt-6">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};