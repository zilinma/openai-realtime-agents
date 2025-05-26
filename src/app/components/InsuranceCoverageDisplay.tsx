"use client";

import React from "react";

export interface InsuranceCoverage {
  homeCare?: string;
  rehabilitation?: string;
  inpatientCare?: string;
  specializedServices?: string;
  equipmentCoverage?: string;
  limitations?: string;
  deductible?: string;
  copay?: string;
  outOfPocketMax?: string;
  additionalNotes?: string;
}

interface InsuranceCoverageDisplayProps {
  insuranceCoverage: InsuranceCoverage;
  isVisible: boolean;
}

function InsuranceCoverageDisplay({ insuranceCoverage, isVisible }: InsuranceCoverageDisplayProps) {
  if (!isVisible) return null;

  const coverageSections = [
    {
      title: "Care Coverage",
      fields: [
        { label: "Home Care", value: insuranceCoverage.homeCare },
        { label: "Rehabilitation Services", value: insuranceCoverage.rehabilitation },
        { label: "Inpatient Care", value: insuranceCoverage.inpatientCare },
        { label: "Specialized Services", value: insuranceCoverage.specializedServices },
        { label: "Equipment Coverage", value: insuranceCoverage.equipmentCoverage },
      ]
    },
    {
      title: "Financial Information",
      fields: [
        { label: "Limitations & Exclusions", value: insuranceCoverage.limitations },
        { label: "Deductible", value: insuranceCoverage.deductible },
        { label: "Co-pay/Co-insurance", value: insuranceCoverage.copay },
        { label: "Out-of-Pocket Maximum", value: insuranceCoverage.outOfPocketMax },
      ]
    },
    {
      title: "Additional Information",
      fields: [
        { label: "Notes", value: insuranceCoverage.additionalNotes },
      ]
    }
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <h3 className="font-medium text-blue-800">Insurance Coverage Analysis</h3>
        <p className="text-sm text-blue-700">Summary of coverage for home care and rehabilitation services.</p>
      </div>

      {coverageSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
          <h3 className="font-medium text-gray-900 mb-3">{section.title}</h3>
          <div className="space-y-2">
            {section.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">{field.label}</span>
                <span className="text-sm text-gray-900 bg-gray-50 p-2 rounded border min-h-[2rem]">
                  {field.value || "Not specified"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.values(insuranceCoverage).every(value => !value) && (
        <div className="text-center text-gray-500 italic py-8">
          Upload insurance documents to analyze coverage for home care and rehabilitation services.
        </div>
      )}
    </div>
  );
}

export default InsuranceCoverageDisplay; 