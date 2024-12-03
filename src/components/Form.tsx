import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import apiResponses from "../api/apiResponses";
import Sidebar from "./Sidebar";
import Alert from "./Alert";

// Types for form structure and data
interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface FormData {
  [key: string]: string | number;
}

const Form: React.FC = () => {
  const [formType, setFormType] = useState<string>("User Information");
  const [formStructure, setFormStructure] = useState<FormField[]>([]);
  const [submittedData, setSubmittedData] = useState<Record<string, FormData[]>>({
    "User Information": [],
    "Address Information": [],
    "Payment Information": [],
  });
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>();

  // Fetch form structure when form type changes
  useEffect(() => {
    setFormStructure(apiResponses[formType]?.fields || []);
    reset({});
    setProgress(0);
    setMessage("");
    setEditIndex(null);
  }, [formType, reset]);

  // Calculate progress based on filled fields
  useEffect(() => {
    const subscription = watch((values) => {
      const totalFields = Object.keys(values).length;
      const filledFields = Object.values(values).filter(value => value !== undefined && value !== "").length;
      const progress = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
      setProgress(progress);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (editIndex !== null) {
      const updatedSubmittedData = [...submittedData[formType]];
      updatedSubmittedData[editIndex] = data;
      setSubmittedData((prevData) => ({
        ...prevData,
        [formType]: updatedSubmittedData,
      }));
      setMessage("Form updated successfully!");
      setEditIndex(null);
    } else {
      setSubmittedData((prevData) => ({
        ...prevData,
        [formType]: [...prevData[formType], data],
      }));
      setMessage("Form submitted successfully!");
    }
    reset();
  };

  const handleEdit = (index: number, data: FormData) => {
    setEditIndex(index); 
    setMessage("");
    Object.keys(data).forEach((key) => {
      setValue(key, data[key]); 
    });
    setIsSidebarVisible(false);
  };

  const handleDelete = (index: number) => {
    const updatedSubmittedData = submittedData[formType].filter((_, i) => i !== index);
    setSubmittedData((prevData) => ({
      ...prevData,
      [formType]: updatedSubmittedData,
    }));
  };

  useEffect(() => {
    if (message) {
      setShowAlert(true);
    }
  }, [message]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    setMessage('');
  };


  // if(isSidebarVisible) return null;

  return (
    <div className="relative max-w-2xl w-full mx-auto px-4 pb-4 bg-white shadow-md rounded-md overflow-y-auto hide-scrollbar">

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Form Type Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700">Select Form Type:</label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md box-border"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          {Object.keys(apiResponses).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStructure.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            {field.type === "dropdown" ? (
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                {...register(field.name, { required: field.required })}
              >
                <option value="">Select</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                {...register(field.name, { required: field.required })}
              />
            )}
            {errors[field.name] && (
              <span className="text-red-500">{field.label} is required</span>
            )}
          </div>
        ))}
        <div className="relative">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {editIndex !== null ? "Update" : "Submit"}
          </button>
          {showAlert && (
            <Alert
              message={message}
              duration={2000}
              onClose={handleCloseAlert}
            />
          )}
        </div>
      </form>

      {/* Sidebar Button */}
      <button
        className="fixed top-4 right-4 bg-blue-500 text-white p-2 px-3 rounded-full shadow-lg sm:text-base text-xs"
        onClick={() => setIsSidebarVisible(true)}
      >
        <span className="hidden lg:inline">View Submitted Data</span>
        <span className="hidden md:inline lg:hidden">Data</span>
        <span className="inline md:hidden">D</span>
      </button>

      {/* Sidebar */}
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        data={submittedData[formType]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Form;