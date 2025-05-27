"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CarePlanInput {
  patientName: string;
  age: string;
  diagnosis: string;
  medications: string;
  mobility: string;
  dietaryRestrictions: string;
  followUpAppointments: string;
  dischargeDate: string;
  specialInstructions: string;
}

interface CarePlan {
  medications: {
    schedule: string;
    instructions: string;
    reminders: string;
  };
  meals: {
    recommendations: string;
    restrictions: string;
    mealPlan: string;
  };
  followUps: {
    appointments: string;
    transportation: string;
    preparation: string;
  };
  dailyActivities: {
    morningRoutine: string;
    afternoonRoutine: string;
    eveningRoutine: string;
    mobilityExercises: string;
  };
  caregiverInstructions: {
    signs: string;
    emergency: string;
    respite: string;
  };
}

export default function CarePlanPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [carePlan, setCarePlan] = useState<CarePlan | null>(null);
  const [formData, setFormData] = useState<CarePlanInput>({
    patientName: '',
    age: '',
    diagnosis: '',
    medications: '',
    mobility: '',
    dietaryRestrictions: '',
    followUpAppointments: '',
    dischargeDate: '',
    specialInstructions: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateCarePlan = async () => {
    setIsGenerating(true);
    
    try {
      // Call our API endpoint
      const response = await fetch("/api/generate-care-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setCarePlan(data.carePlan);
    } catch (error) {
      console.error("Error generating care plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateCarePlan();
  };

  const handleBack = () => {
    router.push('/');
  };

  const formatCarePlanForPrint = () => {
    if (!carePlan) return '';
    
    return `
# DISCHARGE CARE PLAN FOR ${formData.patientName.toUpperCase() || "PATIENT"}
Prepared: ${new Date().toLocaleDateString()}
Discharge Date: ${formData.dischargeDate || "Not specified"}

## MEDICATION SCHEDULE
${carePlan.medications.schedule}

### Medication Instructions
${carePlan.medications.instructions}

## NUTRITION PLAN
${carePlan.meals.recommendations}

### Dietary Restrictions
${carePlan.meals.restrictions}

### Suggested Meal Plan
${carePlan.meals.mealPlan}

## FOLLOW-UP APPOINTMENTS
${carePlan.followUps.appointments}

### Transportation Planning
${carePlan.followUps.transportation}

## DAILY ACTIVITY SCHEDULE
### Morning
${carePlan.dailyActivities.morningRoutine}

### Afternoon
${carePlan.dailyActivities.afternoonRoutine}

### Evening
${carePlan.dailyActivities.eveningRoutine}

### Mobility Exercises
${carePlan.dailyActivities.mobilityExercises}

## CAREGIVER INSTRUCTIONS
### Warning Signs
${carePlan.caregiverInstructions.signs}

### Emergency Procedures
${carePlan.caregiverInstructions.emergency}

## SPECIAL INSTRUCTIONS
${formData.specialInstructions || "None provided"}
    `;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Care Plan for ${formData.patientName || "Patient"}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              h1 { color: #2563eb; }
              h2 { color: #1e40af; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
              h3 { color: #3b82f6; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${formatCarePlanForPrint()}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/corgi-logo.svg" alt="CorgiVoice Logo" width={32} height={32} className="mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">
              <span className="font-bold text-orange-600">CorgiVoice</span> <span className="text-gray-500">Discharge Care Plan Generator</span>
            </h1>
          </div>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
          >
            Back to Home
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!carePlan ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Generate Post-Discharge Care Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-800">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    id="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-800">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-800">
                    Diagnosis/Condition
                  </label>
                  <input
                    type="text"
                    name="diagnosis"
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="mobility" className="block text-sm font-medium text-gray-800">
                    Mobility Status
                  </label>
                  <input
                    type="text"
                    name="mobility"
                    id="mobility"
                    placeholder="e.g., independent, walker, wheelchair"
                    value={formData.mobility}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="dischargeDate" className="block text-sm font-medium text-gray-800">
                    Discharge Date
                  </label>
                  <input
                    type="date"
                    name="dischargeDate"
                    id="dischargeDate"
                    value={formData.dischargeDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-800">
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    id="dietaryRestrictions"
                    placeholder="e.g., low sodium, diabetic, pureed"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="medications" className="block text-sm font-medium text-gray-800">
                    Medications (comma separated)
                  </label>
                  <input
                    type="text"
                    name="medications"
                    id="medications"
                    placeholder="e.g., Lisinopril 10mg, Metformin 500mg, Aspirin 81mg"
                    value={formData.medications}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="followUpAppointments" className="block text-sm font-medium text-gray-800">
                    Follow-up Appointments
                  </label>
                  <input
                    type="text"
                    name="followUpAppointments"
                    id="followUpAppointments"
                    placeholder="e.g., Cardiology on 5/15, Primary Care on 5/20"
                    value={formData.followUpAppointments}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-800">
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    id="specialInstructions"
                    rows={3}
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Care Plan'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Care Plan for {formData.patientName || "Patient"}
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setCarePlan(null)}
                    className="px-3 py-1 bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
                  >
                    Edit Info
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1 bg-blue-600 rounded text-white hover:bg-blue-700"
                  >
                    Print Plan
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                Generated on {new Date().toLocaleDateString()} • Discharge Date: {formData.dischargeDate || "Not specified"}
              </p>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medication Schedule */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 text-lg mb-3">Medication Schedule</h3>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.medications.schedule}</div>
                <h4 className="font-medium text-blue-700 mt-4 mb-1">Instructions</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.medications.instructions}</div>
                <h4 className="font-medium text-blue-700 mt-4 mb-1">Reminders</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.medications.reminders}</div>
              </div>

              {/* Meals */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 text-lg mb-3">Nutrition Plan</h3>
                <h4 className="font-medium text-green-700 mb-1">Recommendations</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.meals.recommendations}</div>
                <h4 className="font-medium text-green-700 mt-4 mb-1">Restrictions</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.meals.restrictions}</div>
                <h4 className="font-medium text-green-700 mt-4 mb-1">Suggested Meal Plan</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.meals.mealPlan}</div>
              </div>

              {/* Follow-up */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 text-lg mb-3">Follow-up Appointments</h3>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.followUps.appointments}</div>
                <h4 className="font-medium text-purple-700 mt-4 mb-1">Transportation Planning</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.followUps.transportation}</div>
                <h4 className="font-medium text-purple-700 mt-4 mb-1">Appointment Preparation</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.followUps.preparation}</div>
              </div>

              {/* Daily Activities */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-medium text-amber-800 text-lg mb-3">Daily Activity Schedule</h3>
                <h4 className="font-medium text-amber-700 mb-1">Morning Routine</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.dailyActivities.morningRoutine}</div>
                <h4 className="font-medium text-amber-700 mt-4 mb-1">Afternoon Routine</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.dailyActivities.afternoonRoutine}</div>
                <h4 className="font-medium text-amber-700 mt-4 mb-1">Evening Routine</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.dailyActivities.eveningRoutine}</div>
                <h4 className="font-medium text-amber-700 mt-4 mb-1">Mobility Exercises</h4>
                <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.dailyActivities.mobilityExercises}</div>
              </div>

              {/* Caregiver Instructions */}
              <div className="bg-red-50 p-4 rounded-lg lg:col-span-2">
                <h3 className="font-medium text-red-800 text-lg mb-3">Caregiver Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-red-700 mb-1">Warning Signs</h4>
                    <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.caregiverInstructions.signs}</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 mb-1">Emergency Procedures</h4>
                    <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.caregiverInstructions.emergency}</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 mb-1">Caregiver Support</h4>
                    <div className="whitespace-pre-line text-sm text-gray-900">{carePlan.caregiverInstructions.respite}</div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              {formData.specialInstructions && (
                <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                  <h3 className="font-medium text-gray-800 text-lg mb-3">Special Instructions</h3>
                  <div className="whitespace-pre-line text-sm text-gray-900">{formData.specialInstructions}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 