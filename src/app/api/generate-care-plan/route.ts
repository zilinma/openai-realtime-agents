import { NextRequest, NextResponse } from "next/server";
import MockOpenAI from "@/app/lib/mockOpenAI";

// Care plan generation prompt
const CARE_PLAN_PROMPT = `
You are an expert in discharge planning and post-hospitalization care.
Based on the patient information provided, generate a comprehensive care plan that includes:

1. Medication Schedule: When and how to take prescribed medications
2. Medication Instructions: Special considerations for taking medications
3. Nutrition Recommendations: Dietary guidelines based on the patient's condition
4. Dietary Restrictions: Foods to avoid or limit
5. Meal Plan: Sample meal structure for the patient
6. Follow-up Appointments: Schedule of appointments with healthcare providers
7. Transportation Options: Ways to get to appointments
8. Appointment Preparation: What to bring and how to prepare
9. Daily Routines: Morning, afternoon, and evening schedules
10. Mobility Exercises: Safe physical activities based on mobility status
11. Warning Signs: Symptoms that require medical attention
12. Emergency Procedures: Steps to take in urgent situations
13. Caregiver Support: Resources and self-care for caregivers

Format the response as a structured JSON object with these categories.
`;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data) {
      return NextResponse.json(
        { error: "No patient data provided" },
        { status: 400 }
      );
    }

    // Initialize OpenAI client (using mock for demo purposes)
    // In production, use real OpenAI client:
    // const openai = new OpenAI({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
    
    // Using mock for demo purposes
    const openai = new MockOpenAI();

    // Prepare message for the model
    const messages = [
      { role: "system", content: CARE_PLAN_PROMPT },
      { 
        role: "user", 
        content: `Generate a discharge care plan for the following patient:
        name: ${data.patientName || "Patient"}
        age: ${data.age || "Unknown"}
        diagnosis: ${data.diagnosis || "Post-hospitalization recovery"}
        medications: ${data.medications || "As prescribed"}
        mobility: ${data.mobility || "Limited"}
        dietary restrictions: ${data.dietaryRestrictions || "None specified"}
        follow-up appointments: ${data.followUpAppointments || "As recommended by healthcare provider"}
        discharge date: ${data.dischargeDate || "Recent"}
        special instructions: ${data.specialInstructions || "None provided"}`
      }
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      messages: messages,
      temperature: 0.7,
    });

    // Extract and parse the response
    const content = response.choices[0]?.message?.content || "{}";
    let carePlan;
    
    try {
      carePlan = JSON.parse(content);
    } catch (error) {
      console.error("Error parsing care plan JSON:", error);
      carePlan = { error: "Failed to parse care plan data" };
    }

    return NextResponse.json({ carePlan });
  } catch (error) {
    console.error("Error generating care plan:", error);
    return NextResponse.json(
      { error: "Failed to generate care plan" },
      { status: 500 }
    );
  }
} 