import React from "react";

interface SubmittedDataTableProps {
  data: Array<Record<string, string | number>>;
  onEdit: (index: number, updatedData: Record<string, string | number>) => void;
  onDelete: (index: number) => void;
}

const SubmittedDataTable: React.FC<SubmittedDataTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Submitted Data</h3>
      {data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="py-2 px-4 border-b border-gray-300 text-center">
                  {key}
                </th>
              ))}
              <th className="py-2 px-4 border-b border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="py-2 px-4 border-b border-gray-300 text-center">
                    {value}
                  </td>
                ))}
                <td className="py-2 px-4 text-center border-b border-gray-300">
                  <button
                    className="text-blue-500 hover:underline mr-3"
                    onClick={() => onEdit(index, row)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No data submitted yet.</p>
      )}
    </div>
  );
};

export default SubmittedDataTable;