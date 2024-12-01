import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  console.log(progress),
  <div className="w-full">
    <div className="bg-blue-400 h-10" style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;
