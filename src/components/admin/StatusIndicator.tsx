import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

type StatusType = 'healthy' | 'warning' | 'error';

interface StatusIndicatorProps {
  status: StatusType;
  name: string;
  message?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  name,
  message,
}) => {
  const statusConfig = {
    healthy: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      label: 'Healthy',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-400',
    },
    warning: {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      label: 'Warning',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-700 dark:text-yellow-400',
    },
    error: {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      label: 'Error',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-700 dark:text-red-400',
    },
  };

  const { icon, label, bgColor, textColor } = statusConfig[status];

  return (
    <div className={`${bgColor} ${textColor} rounded-lg p-4`}>
      <div className="flex items-center">
        {icon}
        <div className="ml-3">
          <p className="font-medium">{name}: {label}</p>
          {message && <p className="text-sm mt-1">{message}</p>}
        </div>
      </div>
    </div>
  );
};