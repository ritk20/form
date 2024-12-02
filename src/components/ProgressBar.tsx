import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="pt-4 pb-6 bg-white sticky top-0 z-10 h-4">
    <div className="w-full bg-gray-200 rounded-full">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
    </div>
    </div>
);

export default ProgressBar;
