import React from 'react';

interface LoadingProps {
  type?: 'spinner' | 'skeleton';
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  type = 'spinner',
  message = 'Loading...' 
}) => {
  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div className="flex p-4">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-md mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};