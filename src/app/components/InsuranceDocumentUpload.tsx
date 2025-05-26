"use client";

import React, { useState } from "react";

interface InsuranceDocumentUploadProps {
  onUploadComplete: (coverageInfo: any) => void;
  isVisible: boolean;
}

function InsuranceDocumentUpload({ onUploadComplete, isVisible }: InsuranceDocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isVisible) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      // Create form data
      const formData = new FormData();
      formData.append("insuranceDocument", file);

      // Send to API
      const response = await fetch("/api/analyze-insurance", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      onUploadComplete(data.coverage);
    } catch (error) {
      console.error("Error uploading document:", error);
      setUploadError("Failed to analyze insurance document. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-md bg-white">
      <h3 className="text-sm font-medium mb-2">Upload Insurance Documents</h3>
      <p className="text-xs text-gray-500 mb-3">
        Upload your insurance policy or explanation of benefits to analyze coverage for home care and rehabilitation.
      </p>
      
      <div className="flex items-center gap-2">
        <label className="relative flex-1">
          <input
            type="file"
            className="sr-only"
            accept=".pdf,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <div className={`flex items-center justify-between px-3 py-2 text-sm border rounded cursor-pointer ${file ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
            <span className="truncate">
              {file ? file.name : "Choose file..."}
            </span>
            <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded">
              Browse
            </span>
          </div>
        </label>
        
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md text-white ${isUploading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? "Analyzing..." : "Upload"}
        </button>
      </div>
      
      {uploadError && (
        <div className="mt-2 text-sm text-red-600">
          {uploadError}
        </div>
      )}
      
      {isUploading && (
        <div className="mt-2 text-sm text-gray-600">
          Analyzing insurance coverage... This may take a moment.
        </div>
      )}
    </div>
  );
}

export default InsuranceDocumentUpload; 