import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import apiResponses from "../api/apiResponses";
import Sidebar from "./Sidebar";

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const formValues = useWatch({ control });

  // Fetch form structure when form type changes
  useEffect(() => {
    setFormStructure(apiResponses[formType]?.fields || []);
    reset({});
    setProgress(0);
    setMessage("");
  }, [formType, reset]);

  // Calculate progress based on filled fields
  const calculateProgress = () => {
    if (!formStructure.length) return;
    const filledFields = Object.keys(formValues).filter(
      (key) => formValues[key] !== undefined && formValues[key] !== ""
    );
    setProgress((filledFields.length / formStructure.length) * 100);
  };

  // Form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSubmittedData((prevData) => ({
      ...prevData,
      [formType]: [...prevData[formType], data],
    }));
    setMessage("Form submitted successfully!");
    reset({});
  };

  const handleEdit = (index: number, updatedData: Record<string, string | number>) => {
    const updatedSubmittedData = [...submittedData[formType]];
    updatedSubmittedData[index] = updatedData;
    setSubmittedData((prevData) => ({
      ...prevData,
      [formType]: updatedSubmittedData,
    }));
  };

  const handleDelete = (index: number) => {
    const updatedSubmittedData = submittedData[formType].filter((_, i) => i !== index);
    setSubmittedData((prevData) => ({
      ...prevData,
      [formType]: updatedSubmittedData,
    }));
  };

  return (
    <div className="relative max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Dynamic Form</h2>

      {/* Form Type Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700">Select Form Type:</label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            <label className="block text-gray-700">{field.label}:</label>
            {field.type === "dropdown" ? (
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                {...register(field.name, { required: field.required })}
                onBlur={calculateProgress}
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
                onBlur={calculateProgress}
              />
            )}
            {errors[field.name] && (
              <span className="text-red-500">{field.label} is required</span>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Message */}
      {message && <p className="mt-4 text-green-500">{message}</p>}

      {/* Sidebar Button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarVisible(true)}
      >
        View Submitted Data
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