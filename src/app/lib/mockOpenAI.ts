// Mock OpenAI implementation for testing
class MockOpenAI {
  apiKey: string;

  constructor(options: { apiKey?: string } = {}) {
    this.apiKey = options.apiKey || "mock-key";
  }

  chat = {
    completions: {
      create: async (options?: { model?: string; messages?: any[]; temperature?: number; prompt?: string; }) => {
        // Determine what kind of response to send based on the prompt or messages
        if (options?.messages && options.messages.some(msg => msg.content?.includes('discharge care plan'))) {
          return this.generateCarePlan(options.messages);
        }
        
        // Default insurance document analysis response
        return {
          choices: [
            {
              message: {
                content: JSON.stringify({
                  homeCare: "Covered at 80% after deductible. Limited to 60 visits per year. Must be medically necessary and prescribed by a physician. Includes skilled nursing, home health aides, and medical social services.",
                  rehabilitation: "Physical therapy, occupational therapy, and speech therapy all covered at 80% after deductible, limited to 30 sessions per year each. Cognitive rehabilitation is not covered.",
                  inpatientCare: "Skilled nursing facility covered at 80% after deductible for up to 100 days per benefit period. Assisted living facility not covered under medical benefits. Nursing home care has limited coverage for skilled nursing only, not custodial care.",
                  specializedServices: "Not specified in document.",
                  equipmentCoverage: "Durable medical equipment covered at 80% after deductible. Requires prior authorization for items over $500. Includes wheelchairs, hospital beds, oxygen equipment.",
                  limitations: "Custodial care not covered. Experimental treatments not covered. Cosmetic services not covered. Services not deemed medically necessary not covered. Prior authorization required for certain services.",
                  deductible: "$1,500 individual / $3,000 family annually.",
                  copay: "20% co-insurance for most covered services after deductible.",
                  outOfPocketMax: "$5,000 individual / $10,000 family per year.",
                  additionalNotes: "This policy provides coverage for medical and healthcare services required for assisted living and home care. All services must be medically necessary to be covered."
                })
              }
            }
          ]
        };
      }
    }
  };

  private generateCarePlan(messages: any[]) {
    // Extract patient data from the messages
    const userMessage = messages.find(msg => msg.role === 'user')?.content || '';
    
    // Try to extract basic patient information
    let diagnosis = "Post-surgery recovery";
    let mobility = "Limited";
    
    try {
      // This is a simple mock extraction - in a real app, we'd use more sophisticated parsing
      if (userMessage.includes("name:")) {
        // No need to store the name if we're not using it
        // const nameMatch = userMessage.match(/name:\s*([^,\n]+)/i);
        // if (nameMatch && nameMatch[1]) patientName = nameMatch[1].trim();
      }
      
      if (userMessage.includes("diagnosis:")) {
        const diagMatch = userMessage.match(/diagnosis:\s*([^,\n]+)/i);
        if (diagMatch && diagMatch[1]) diagnosis = diagMatch[1].trim();
      }
      
      if (userMessage.includes("mobility:")) {
        const mobMatch = userMessage.match(/mobility:\s*([^,\n]+)/i);
        if (mobMatch && mobMatch[1]) mobility = mobMatch[1].trim();
      }
    } catch (e) {
      console.error("Error parsing patient data:", e);
    }
    
    return {
      choices: [
        {
          message: {
            content: JSON.stringify({
              medications: {
                schedule: diagnosis.includes("diabetes") ? 
                  "Morning (8:00 AM):\n- Metformin 500mg with breakfast\n- Lisinopril 10mg\n\nEvening (6:00 PM):\n- Metformin 500mg with dinner" :
                  "Morning (8:00 AM):\n- Acetaminophen 500mg\n- Multivitamin\n\nAfternoon (2:00 PM):\n- Acetaminophen 500mg as needed for pain\n\nEvening (8:00 PM):\n- Docusate sodium 100mg (stool softener)",
                instructions: "- Take all medications with a full glass of water\n- Store medications in a cool, dry place\n- Use a pill organizer to track daily doses\n- Do not crush or split pills unless specifically instructed",
                reminders: "- Set alarms on phone or use a medication reminder app\n- Keep a medication log to track doses taken\n- Have a family member double-check medication compliance if possible",
              },
              meals: {
                recommendations: diagnosis.includes("diabetes") ?
                  "Based on your diabetes, focus on:\n- Low glycemic index foods\n- Controlled carbohydrate portions\n- High-fiber foods to support blood sugar control\n- Adequate protein (0.8g per kg of body weight)" :
                  "Based on your condition, focus on:\n- Anti-inflammatory foods rich in omega-3s\n- Low sodium options (less than 1500mg daily)\n- High-fiber foods to support digestion\n- Adequate protein (0.8g per kg of body weight)",
                restrictions: diagnosis.includes("diabetes") ? 
                  "Avoid:\n- Sugary beverages and desserts\n- Refined carbohydrates\n- Processed foods high in sodium\n- Alcohol" :
                  "Avoid:\n- High sodium foods\n- Highly processed foods\n- Excessive caffeine\n- Alcohol during recovery",
                mealPlan: "Breakfast:\n- Protein source (eggs, Greek yogurt)\n- Whole grain (oatmeal, whole grain toast)\n- Fruit\n\nLunch:\n- Lean protein (chicken, fish, beans)\n- Complex carbohydrate (brown rice, quinoa)\n- Vegetables (2+ servings)\n\nDinner:\n- Protein source\n- Vegetables (2+ servings)\n- Small portion of whole grains\n\nSnacks:\n- Nuts and seeds\n- Fresh fruit\n- Yogurt",
              },
              followUps: {
                appointments: "1. Primary Care Physician: 2 weeks after discharge\n2. Physical Therapy: 3 times weekly for 4 weeks\n3. Specialist follow-up: 1 month after discharge",
                transportation: "Transportation options:\n- Family assistance\n- Medical transport service (Medicare may cover, call 1-800-MEDICARE)\n- Community ride services for seniors\n- Rideshare apps (Uber Health, Lyft)",
                preparation: "Before appointments:\n- Bring current medication list\n- Note any symptoms or concerns\n- Bring discharge paperwork\n- Arrive 15 minutes early for paperwork\n- Bring insurance information",
              },
              dailyActivities: {
                morningRoutine: `6:00-9:00 AM:\n- Wake up and take morning medications\n- Perform basic hygiene (with ${mobility.includes("independent") ? "independent" : "assisted"} bathing)\n- Eat balanced breakfast\n- Do gentle morning stretches`,
                afternoonRoutine: "12:00-4:00 PM:\n- Eat lunch and take midday medications\n- Perform light activities or short walk if approved\n- Rest period/nap if needed\n- Engage in gentle cognitive activities (reading, puzzles)",
                eveningRoutine: "5:00-10:00 PM:\n- Eat dinner and take evening medications\n- Evening hygiene routine\n- Relaxation activities before bed\n- Ensure safe sleeping environment",
                mobilityExercises: mobility.includes("walker") || mobility.includes("wheelchair") ? 
                  "- Chair-based exercises\n- Assisted standing exercises with support\n- Gentle range of motion activities\n- Breathing exercises" :
                  "- Short walks 3x daily\n- Light stretching\n- Balance exercises\n- Gentle strengthening activities",
              },
              caregiverInstructions: {
                signs: "Watch for and report:\n- Fever above 100.4°F\n- Increased pain or new pain\n- Changes in breathing pattern\n- Confusion or disorientation\n- Difficulty with mobility\n- Changes in appetite or hydration",
                emergency: "For emergency situations:\n- Call 911 for severe symptoms\n- Contact on-call physician for urgent concerns\n- Keep discharge papers and medication list readily available\n- Have a hospital bag prepared for unexpected visits",
                respite: "Caregiver self-care:\n- Schedule respite care through local agencies\n- Connect with support groups\n- Utilize meal delivery services\n- Consider adult day care options\n- Take scheduled breaks",
              }
            })
          }
        }
      ]
    };
  }
}

export default MockOpenAI; 