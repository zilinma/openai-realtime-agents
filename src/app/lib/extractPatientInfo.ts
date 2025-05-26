import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

// Define the schema for patient information
const PatientInfoSchema = z.object({
  name: z.string().optional().describe("Patient's name"),
  age: z.string().optional().describe("Patient's age"),
  currentSituation: z.string().optional().describe("Current living situation"),
  caregiverRelationship: z.string().optional().describe("Relationship of caregiver to patient"),
  careLevel: z.string().optional().describe("Level of care needed (independent, assisted, memory care, etc.)"),
  medicalConditions: z.string().optional().describe("Medical conditions or diagnoses"),
  mobility: z.string().optional().describe("Mobility requirements or limitations"),
  location: z.string().optional().describe("Preferred location or area"),
  budget: z.string().optional().describe("Budget range for monthly costs"),
  timeline: z.string().optional().describe("Timeline for placement"),
  specialRequirements: z.string().optional().describe("Any special requirements or preferences"),
  concerns: z.string().optional().describe("Main family concerns or priorities")
});

export type PatientInfo = z.infer<typeof PatientInfoSchema>;

export async function extractPatientInformation(conversationText: string): Promise<PatientInfo> {
  const messages = [
    {
      role: "user",
      content: `You are an expert at extracting structured information from conversations about assisted living placement. 

Analyze the following conversation and extract any patient information that has been mentioned. Only include information that was explicitly stated or clearly implied in the conversation. If information wasn't mentioned, leave that field empty.

Focus on extracting:
- Basic patient information (name, age, current situation)
- Care needs and medical information
- Preferences and requirements
- Budget and timeline
- Family concerns

Conversation:
${conversationText}

Extract the patient information in the specified JSON format. Only include information that was actually discussed.`,
    },
  ];

  const response = await fetch("/api/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      response_format: zodResponseFormat(PatientInfoSchema, "patient_info"),
    }),
  });

  if (!response.ok) {
    console.warn("Server returned an error:", response);
    throw new Error("Error extracting patient information");
  }

  const data = await response.json();

  try {
    const parsedContent = JSON.parse(data.choices[0].message.content);
    const patientInfo = PatientInfoSchema.parse(parsedContent);
    return patientInfo;
  } catch (error) {
    console.error("Error parsing patient information:", error);
    throw new Error("Failed to parse patient information");
  }
} 