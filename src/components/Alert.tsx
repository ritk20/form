// Alert.tsx
import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string;
  duration: number;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, duration, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 100 / (duration / 30));
    }, 10);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-2 rounded-md shadow-lg w-64 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
      <div className="w-full bg-green-700 h-1 mt-2">
        <div
          className="bg-green-300 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Alert;