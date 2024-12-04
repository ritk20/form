import React, { useEffect, useRef, useCallback } from "react";
import SubmittedDataTable from "./DataTable";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  data: Array<Record<string, string | number>>;
  onEdit: (index: number, updatedData: Record<string, string | number>) => void;
  onDelete: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isVisible,
  onClose,
  data,
  onEdit,
  onDelete,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, handleClickOutside]);

  if (!isVisible) return null;

  return (
    <div ref={sidebarRef} className="fixed top-0 right-0 w-4/5 h-full bg-gradient-to-r from-slate-300 to-slate-100 drop-shadow-2xl z-50">
      <button
        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        onClick={onClose}
      >
        Close
      </button>
      <div className="p-4">
        <SubmittedDataTable data={data} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default React.memo(Sidebar);