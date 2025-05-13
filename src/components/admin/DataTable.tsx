import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Edit, Trash, Eye, X, ArrowUp, ArrowDown } from 'lucide-react';
import { Internship } from '../../utils/types';
import { formatRelativeDate } from '../../utils/formatters';
import { Button } from '../common/Button';

interface DataTableProps {
  internships: Internship[];
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
}

type SortField = 'position' | 'company' | 'location' | 'postedDate';
type SortDirection = 'asc' | 'desc';

export const DataTable: React.FC<DataTableProps> = ({
  internships,
  onDelete,
  onEdit,
  onView,
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>('postedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleAllSelection = () => {
    if (selectedItems.length === internships.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(internships.map(item => item.id));
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInternships = [...internships].sort((a, b) => {
    let compareValueA;
    let compareValueB;

    switch (sortField) {
      case 'position':
        compareValueA = a.position.toLowerCase();
        compareValueB = b.position.toLowerCase();
        break;
      case 'company':
        compareValueA = a.company.name.toLowerCase();
        compareValueB = b.company.name.toLowerCase();
        break;
      case 'location':
        compareValueA = a.location.toLowerCase();
        compareValueB = b.location.toLowerCase();
        break;
      case 'postedDate':
        compareValueA = new Date(a.postedDate).getTime();
        compareValueB = new Date(b.postedDate).getTime();
        break;
      default:
        compareValueA = a.position.toLowerCase();
        compareValueB = b.position.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return compareValueA > compareValueB ? 1 : -1;
    } else {
      return compareValueA < compareValueB ? 1 : -1;
    }
  });

  const toggleDropdown = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length > 0 && onDelete) {
      // In a real app, you might want to show a confirmation dialog
      selectedItems.forEach(id => onDelete(id));
      setSelectedItems([]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 flex items-center justify-between">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
          </p>
          <div className="flex space-x-2">
            <button 
              className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
              onClick={() => setSelectedItems([])}
            >
              <X className="h-4 w-4" />
            </button>
            <button 
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  checked={selectedItems.length === internships.length && internships.length > 0}
                  onChange={toggleAllSelection}
                />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('position')}
              >
                <div className="flex items-center">
                  Position
                  {sortField === 'position' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('company')}
              >
                <div className="flex items-center">
                  Company
                  {sortField === 'company' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center">
                  Location
                  {sortField === 'location' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('postedDate')}
              >
                <div className="flex items-center">
                  Posted Date
                  {sortField === 'postedDate' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedInternships.map(internship => (
              <tr key={internship.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    checked={selectedItems.includes(internship.id)}
                    onChange={() => toggleSelection(internship.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{internship.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700 dark:text-gray-300">{internship.company.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700 dark:text-gray-300">{internship.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700 dark:text-gray-300">{formatRelativeDate(internship.postedDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => toggleDropdown(internship.id)}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    {activeDropdown === internship.id && (
                      <div 
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => onView && onView(internship.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => onEdit && onEdit(internship.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => onDelete && onDelete(internship.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};