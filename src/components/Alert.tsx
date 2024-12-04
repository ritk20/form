import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string;
  duration: number;
  onClose: () => void;
  type: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, duration, onClose, type }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 100 / (duration / 150));
    }, 130);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  const alertStyles = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const progressStyles = type === 'success' ? 'bg-green-300' : 'bg-red-300';

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${alertStyles} text-white p-2 rounded-md shadow-lg w-64 transition-all duration-300 ease-in-out`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
      <div className={`w-full ${type === 'success' ? 'bg-green-700' : 'bg-red-700'} h-1 mt-2`}>
        <div
          className={`${progressStyles} h-full transition-all duration-300 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Alert;