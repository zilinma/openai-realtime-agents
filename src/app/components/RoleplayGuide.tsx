"use client";

import React from "react";

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

interface RoleplayGuideProps {
  patientInfo: PatientInfo;
  isVisible: boolean;
}

function RoleplayGuide({ patientInfo, isVisible }: RoleplayGuideProps) {
  if (!isVisible) return null;

  const facilityInfo = {
    name: "Sunset Manor Assisted Living",
    beds: "120-bed facility",
    careTypes: ["Independent Living", "Assisted Living", "Memory Care", "Respite Care"],
    services: [
      "24/7 nursing staff",
      "Medication management", 
      "Three meals daily plus snacks",
      "Housekeeping and laundry services",
      "Transportation services",
      "Physical therapy and wellness programs",
      "Social activities and entertainment",
      "Beauty salon and barber shop",
      "Library and computer room",
      "Outdoor gardens and walking paths"
    ],
    rooms: [
      "Studio apartments (400 sq ft) - $3,200-$4,500/month",
      "One-bedroom apartments (600 sq ft) - $4,800-$6,500/month", 
      "Two-bedroom apartments (800 sq ft) - $6,800-$8,200/month",
      "Shared rooms available at reduced cost",
      "Pet-friendly units (small pets under 25 lbs)"
    ],
    availability: {
      independent: "Usually available",
      assisted: "Moderate availability, some waiting for preferred rooms",
      memory: "Limited availability, often has waiting list"
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">
          ℹ
        </div>
        <h3 className="font-semibold text-blue-900">Roleplay Guide - You are Facility Staff</h3>
      </div>
      
      <div className="text-sm text-blue-800 space-y-3">
        <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
          <p className="font-bold text-red-800">
            🎭 <strong>IMPORTANT: You are now FACILITY STAFF!</strong>
          </p>
          <p className="text-red-700 text-xs mt-1">
            The AI is calling YOU as a placement coordinator. You work at {facilityInfo.name} and should respond as facility staff helping with placement inquiries.
          </p>
        </div>
        
        <div className="bg-white rounded p-3 border border-blue-200">
          <h4 className="font-semibold mb-2">📋 Patient Summary (for your reference):</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {patientInfo.name && <div><strong>Name:</strong> {patientInfo.name}</div>}
            {patientInfo.age && <div><strong>Age:</strong> {patientInfo.age}</div>}
            {patientInfo.careLevel && <div><strong>Care Level:</strong> {patientInfo.careLevel}</div>}
            {patientInfo.budget && <div><strong>Budget:</strong> {patientInfo.budget}</div>}
            {patientInfo.timeline && <div><strong>Timeline:</strong> {patientInfo.timeline}</div>}
            {patientInfo.location && <div><strong>Location Pref:</strong> {patientInfo.location}</div>}
          </div>
        </div>

        <div className="bg-white rounded p-3 border border-blue-200">
          <h4 className="font-semibold mb-2">🏢 Your Facility Information:</h4>
          <div className="text-xs space-y-1">
            <div><strong>Facility:</strong> {facilityInfo.name} ({facilityInfo.beds})</div>
            <div><strong>Care Types:</strong> {facilityInfo.careTypes.join(", ")}</div>
            <div><strong>Current Availability:</strong></div>
            <ul className="ml-4 list-disc">
              <li>Independent Living: {facilityInfo.availability.independent}</li>
              <li>Assisted Living: {facilityInfo.availability.assisted}</li>
              <li>Memory Care: {facilityInfo.availability.memory}</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded p-3 border border-blue-200">
          <h4 className="font-semibold mb-2">💬 How to Respond as Facility Staff:</h4>
          <div className="text-xs space-y-2">
            <div className="bg-green-50 border border-green-200 rounded p-2">
              <strong>Your Opening (already provided):</strong><br/>
              "Hello, this is {facilityInfo.name}. This is Sarah from our admissions department. How can I help you today?"
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2">
              <strong>After the coordinator introduces themselves:</strong><br/>
              "Thank you for calling! I'd be happy to discuss our availability and services. What type of care are you looking for?"
            </div>
            <div><strong>About availability:</strong> "Let me check our current openings for memory care..." or "We do have some availability in our memory care unit..."</div>
            <div><strong>About costs:</strong> "Our memory care rates start at $4,200 per month for a shared room, and private rooms are $5,800..."</div>
            <div><strong>About services:</strong> "We specialize in Alzheimer's care with 24/7 nursing staff and can handle immobile residents..."</div>
            <div><strong>Ask questions:</strong> "What level of mobility assistance does your client need?" or "Are there any specific medical requirements?"</div>
            <div><strong>Next steps:</strong> "Would you like to schedule a tour for the family?" or "I can send you our care assessment form"</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
          <p className="text-xs"><strong>💡 Tip:</strong> Be helpful but realistic about availability. Ask questions about the patient's specific needs to show you're assessing fit.</p>
        </div>
      </div>
    </div>
  );
}

export default RoleplayGuide; 