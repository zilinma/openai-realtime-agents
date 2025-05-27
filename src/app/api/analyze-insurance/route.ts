import { NextRequest, NextResponse } from "next/server";
import MockOpenAI from "@/app/lib/mockOpenAI";

// Insurance analysis prompt
const INSURANCE_ANALYSIS_PROMPT = `
You are an expert in analyzing insurance policies and extracting coverage information.
Based on the insurance document provided, please extract the following information:

1. Home Care Coverage: Details on coverage for in-home care services, including skilled nursing, home health aides, etc.
2. Rehabilitation Services: Coverage for physical therapy, occupational therapy, speech therapy, etc.
3. Inpatient Care: Coverage for skilled nursing facilities, assisted living, nursing homes, etc.
4. Specialized Services: Coverage for specialized treatments or services
5. Equipment Coverage: Coverage for medical equipment and assistive devices
6. Limitations & Exclusions: Any notable limitations or exclusions in coverage
7. Deductible: Amount the patient must pay before insurance begins to cover costs
8. Co-pay/Co-insurance: Patient's share of costs after deductible
9. Out-of-Pocket Maximum: Maximum amount patient will have to pay
10. Additional Notes: Any other relevant information about the policy

If information on any category is not available, indicate "Not specified in document".
Format the response as a JSON object with these fields.
`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("insuranceDocument") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Get document text content (this would be used in a real implementation)
    // For this demo, we use mock data
    // We'll keep this commented but remove it from the variables to avoid the error
    // const documentText = `Insurance Policy Document: ${file.name}
    // ... rest of the mock document text ...`;
    
    // Initialize OpenAI client (using mock for demo purposes)
    const openai = new MockOpenAI();

    // Call OpenAI API - using the prompt in a real implementation
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: INSURANCE_ANALYSIS_PROMPT },
        { role: "user", content: `Analyze the insurance document: ${file.name}` }
      ]
    });

    // Extract and parse the response
    const content = response.choices[0]?.message?.content || "{}";
    const coverage = JSON.parse(content);

    return NextResponse.json({ coverage });
  } catch (error) {
    console.error("Error analyzing insurance document:", error);
    return NextResponse.json(
      { error: "Failed to analyze insurance document" },
      { status: 500 }
    );
  }
} 