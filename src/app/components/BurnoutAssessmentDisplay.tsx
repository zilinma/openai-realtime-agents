"use client";

import React from "react";

export interface CaregiverAssessment {
  overallWellbeing?: string;
  stressLevel?: string;
  physicalHealth?: string;
  emotionalState?: string;
  burnoutSigns?: string;
  supportSystem?: string;
  selfCare?: string;
  challengesReported?: string;
  patientUpdates?: string;
  urgentConcerns?: string;
  recommendedResources?: string;
}

interface BurnoutAssessmentDisplayProps {
  caregiverAssessment: CaregiverAssessment;
  isVisible: boolean;
}

function BurnoutAssessmentDisplay({ caregiverAssessment, isVisible }: BurnoutAssessmentDisplayProps) {
  if (!isVisible) return null;
  
  // Debug output to check what data we're receiving
  console.log("BurnoutAssessmentDisplay received:", caregiverAssessment);

  const assessmentSections = [
    {
      title: "Wellbeing Overview",
      fields: [
        { label: "Overall Wellbeing", value: caregiverAssessment.overallWellbeing },
        { label: "Stress Level", value: caregiverAssessment.stressLevel },
        { label: "Physical Health", value: caregiverAssessment.physicalHealth },
        { label: "Emotional State", value: caregiverAssessment.emotionalState },
      ]
    },
    {
      title: "Burnout Indicators",
      fields: [
        { label: "Signs of Burnout", value: caregiverAssessment.burnoutSigns },
        { label: "Support System", value: caregiverAssessment.supportSystem },
        { label: "Self-Care Activities", value: caregiverAssessment.selfCare },
      ]
    },
    {
      title: "Reported Challenges",
      fields: [
        { label: "Key Challenges", value: caregiverAssessment.challengesReported },
        { label: "Patient Updates", value: caregiverAssessment.patientUpdates },
      ]
    },
    {
      title: "Action Items",
      fields: [
        { label: "Urgent Concerns", value: caregiverAssessment.urgentConcerns, highlight: true },
        { label: "Recommended Resources", value: caregiverAssessment.recommendedResources },
      ]
    }
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
        <h3 className="font-medium text-amber-800">Caregiver Burnout Assessment</h3>
        <p className="text-sm text-amber-700">This assessment tracks potential signs of caregiver burnout and stress.</p>
      </div>

      {assessmentSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
          <h3 className="font-medium text-gray-900 mb-3">{section.title}</h3>
          <div className="space-y-2">
            {section.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">{field.label}</span>
                <span className={`text-sm p-2 rounded border min-h-[2rem] ${field.highlight && field.value ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                  {field.value || "Not assessed yet"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white rounded p-3 border border-blue-200">
        <h4 className="font-semibold mb-2">👨‍⚕️ Action Items</h4>
        <div className="text-xs space-y-1">
          <div><strong>Resources Recommended:</strong> {caregiverAssessment.recommendedResources || "None recommended yet"}</div>
          <div><strong>Should Schedule Follow-up?</strong> {caregiverAssessment.urgentConcerns ? "Yes, ASAP" : "Regular check-in schedule"}</div>
          <div><strong>Patient Status Updates:</strong> {caregiverAssessment.patientUpdates || "No updates provided"}</div>
        </div>
      </div>

      {!Object.values(caregiverAssessment).some(val => !!val) && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm my-4">
          <p className="font-medium mb-2">👋 Welcome to your caregiver check-in</p>
          <p className="text-gray-600">Our AI assistant will check on your wellbeing and help identify if you&apos;re experiencing caregiver burnout. Feel free to discuss how you&apos;re feeling caring for your loved one.</p>
        </div>
      )}
    </div>
  );
}

export default BurnoutAssessmentDisplay; 