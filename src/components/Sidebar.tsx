import React from "react";
import SubmittedDataTable from "./DataTable";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  data: Array<Record<string, string | number>>;
  onEdit: (index: number, updatedData: Record<string, string | number>) => void;
  onDelete: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose, data, onEdit, onDelete }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 right-0 w-4/5 h-full bg-white shadow-lg z-50 p-4 overflow-auto">
      <button
        className="absolute top-4 right-4 text-gray-700"
        onClick={onClose}
      >
        Close
      </button>
      <SubmittedDataTable
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Sidebar;