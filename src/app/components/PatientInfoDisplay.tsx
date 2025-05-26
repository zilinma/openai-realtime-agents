"use client";

import React, { useState } from "react";
import RoleplayGuide from "./RoleplayGuide";
import BurnoutAssessmentDisplay, { CaregiverAssessment } from "./BurnoutAssessmentDisplay";
import InsuranceDocumentUpload from "./InsuranceDocumentUpload";
import InsuranceCoverageDisplay, { InsuranceCoverage } from "./InsuranceCoverageDisplay";

interface PatientInfo {
  name?: string;
  age?: string;
  currentSituation?: string;
  caregiverRelationship?: string;
  careLevel?: string;
  medicalConditions?: string;
  mobility?: string;
  location?: string;
  budget?: string;
  timeline?: string;
  specialRequirements?: string;
  concerns?: string;
}

interface PatientInfoDisplayProps {
  patientInfo: PatientInfo;
  currentAgent?: string;
  caregiverAssessment?: CaregiverAssessment;
}

function PatientInfoDisplay({ patientInfo, currentAgent, caregiverAssessment = {} }: PatientInfoDisplayProps) {
  const [insuranceCoverage, setInsuranceCoverage] = useState<InsuranceCoverage>({});
  const [showInsuranceInfo, setShowInsuranceInfo] = useState<boolean>(false);
  
  const showRoleplayGuide = currentAgent === "bookingAgent";
  const showBurnoutAssessment = currentAgent === "checkInAgent";
  const showInsuranceUpload = currentAgent === "informationCollector";
  
  const handleInsuranceUploadComplete = (coverageInfo: InsuranceCoverage) => {
    setInsuranceCoverage(coverageInfo);
    setShowInsuranceInfo(true);
  };
  
  const infoSections = [
    {
      title: "Basic Information",
      fields: [
        { label: "Patient Name", value: patientInfo.name },
        { label: "Age", value: patientInfo.age },
        { label: "Current Situation", value: patientInfo.currentSituation },
        { label: "Caregiver Relationship", value: patientInfo.caregiverRelationship },
      ]
    },
    {
      title: "Care Requirements",
      fields: [
        { label: "Care Level Needed", value: patientInfo.careLevel },
        { label: "Medical Conditions", value: patientInfo.medicalConditions },
        { label: "Mobility Requirements", value: patientInfo.mobility },
      ]
    },
    {
      title: "Preferences & Logistics",
      fields: [
        { label: "Preferred Location", value: patientInfo.location },
        { label: "Budget Range", value: patientInfo.budget },
        { label: "Timeline", value: patientInfo.timeline },
        { label: "Special Requirements", value: patientInfo.specialRequirements },
      ]
    },
    {
      title: "Family Concerns",
      fields: [
        { label: "Main Concerns", value: patientInfo.concerns },
      ]
    }
  ];

  return (
    <div className="flex flex-col bg-white min-h-0 rounded-xl">
      <div className="px-6 py-3 sticky top-0 z-10 text-base border-b bg-white rounded-t-xl">
        <span className="font-semibold">
          {showRoleplayGuide ? "Facility Staff Guide" : 
           showBurnoutAssessment ? "Caregiver Check-In" : 
           "Patient Information"}
        </span>
      </div>
      
      <div className="overflow-auto p-4 flex flex-col gap-y-4 h-full">
        {showRoleplayGuide && (
          <RoleplayGuide patientInfo={patientInfo} isVisible={true} />
        )}
        
        {showBurnoutAssessment && (
          <BurnoutAssessmentDisplay caregiverAssessment={caregiverAssessment} isVisible={true} />
        )}
        
        {showInsuranceUpload && (
          <>
            <InsuranceDocumentUpload onUploadComplete={handleInsuranceUploadComplete} isVisible={true} />
            {showInsuranceInfo && (
              <InsuranceCoverageDisplay insuranceCoverage={insuranceCoverage} isVisible={true} />
            )}
          </>
        )}
        
        {(!showBurnoutAssessment || Object.values(patientInfo).some(value => !!value)) && 
          infoSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="font-medium text-gray-900 mb-3">{section.title}</h3>
              <div className="space-y-2">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">{field.label}</span>
                    <span className="text-sm text-gray-900 bg-gray-50 p-2 rounded border min-h-[2rem]">
                      {field.value || "Not provided"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
        
        {Object.values(patientInfo).every(value => !value) && !showRoleplayGuide && !showBurnoutAssessment && (
          <div className="text-center text-gray-500 italic py-8">
            Patient information will appear here as it's collected during the conversation.
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientInfoDisplay; 