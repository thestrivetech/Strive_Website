import React from 'react';
import { X, RefreshCw, Download } from 'lucide-react';
import { useUpdateNotification } from '@/hooks/useUpdateNotification';

interface UpdateNotificationProps {
  className?: string;
  position?: 'top' | 'bottom';
  autoApply?: boolean;
}

export const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  className = '',
  position = 'top',
  autoApply = false,
}) => {
  const {
    hasUpdate,
    showNotification,
    isChecking,
    newVersion,
    currentVersion,
    error,
    applyUpdate,
    dismissNotification,
    checkForUpdate,
  } = useUpdateNotification();

  // Don't render if no update or notification is dismissed
  if (!showNotification || (!hasUpdate && !error)) {
    return null;
  }

  const positionClasses = position === 'top'
    ? 'top-0 left-0 right-0'
    : 'bottom-0 left-0 right-0';

  if (error) {
    return (
      <div className={`fixed ${positionClasses} z-50 ${className}`}>
        <div className="bg-red-500 text-white px-4 py-3 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-5 h-5" />
              <div>
                <p className="font-medium">Update Check Failed</p>
                <p className="text-sm text-red-100">{error}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={checkForUpdate}
                disabled={isChecking}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
              >
                {isChecking ? 'Checking...' : 'Retry'}
              </button>
              <button
                onClick={dismissNotification}
                className="text-red-100 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed ${positionClasses} z-50 ${className}`}>
      <div className="bg-blue-500 text-white px-4 py-3 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5" />
            <div>
              <p className="font-medium">Update Available</p>
              <p className="text-sm text-blue-100">
                A new version is available{newVersion && ` (${newVersion})`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={applyUpdate}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              Update Now
            </button>
            <button
              onClick={dismissNotification}
              className="text-blue-100 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Minimal update notification component for subtle notifications
 */
export const UpdateNotificationMinimal: React.FC<UpdateNotificationProps> = ({
  className = '',
}) => {
  const { hasUpdate, showNotification, applyUpdate, dismissNotification } = useUpdateNotification();

  if (!showNotification || !hasUpdate) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Download className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">Update Available</p>
            <p className="text-sm text-gray-500">A new version of the app is ready.</p>
          </div>
          <button
            onClick={dismissNotification}
            className="flex-shrink-0 text-gray-400 hover:text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex space-x-2">
          <button
            onClick={applyUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
          >
            Refresh
          </button>
          <button
            onClick={dismissNotification}
            className="text-gray-500 hover:text-gray-600 px-3 py-1 rounded text-sm font-medium"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;