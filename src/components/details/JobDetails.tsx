import React from 'react';
import { MapPin, Clock, Briefcase, Share2, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Internship } from '../../utils/types';
import { formatRelativeDate, formatDescription } from '../../utils/formatters';
import { Button } from '../common/Button';

interface JobDetailsProps {
  internship: Internship;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ internship }) => {
  const {
    id,
    location,
    workType,
    duration,
    postedDate,
    description
  } = internship;

  return (
    <div>
      {/* Job Metadata */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
            <p className="font-medium text-gray-900 dark:text-white">{location}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Work Type</p>
            <p className="font-medium text-gray-900 dark:text-white">{workType}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
            <p className="font-medium text-gray-900 dark:text-white">{duration}</p>
          </div>
        </div>
      </div>
      
      {/* Posted Date */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Posted {formatRelativeDate(postedDate)}
        </p>
      </div>
      
      {/* Description */}
      <div className="mb-8 prose prose-blue dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: formatDescription(description) }} />
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to={`/internship/${id}/apply`} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto flex items-center justify-center">
            Apply Now
          </Button>
        </Link>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Flag className="mr-2 h-4 w-4" /> Report
          </Button>
        </div>
      </div>
    </div>
  );
};