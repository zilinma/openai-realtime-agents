import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
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

    // Get document text content (in a real implementation, we would extract text from PDF/DOCX)
    // For this demo, we'll use the file name and some mock content
    const documentText = `Insurance Policy Document: ${file.name}
    
POLICY SUMMARY:
This policy provides coverage for medical and healthcare services required for assisted living and home care.

HOME CARE SERVICES:
- Covered at 80% after deductible
- Limited to 60 visits per year
- Must be medically necessary and prescribed by a physician
- Includes skilled nursing, home health aides, and medical social services

REHABILITATION SERVICES:
- Physical therapy: Covered at 80% after deductible, limited to 30 sessions per year
- Occupational therapy: Covered at 80% after deductible, limited to 30 sessions per year
- Speech therapy: Covered at 80% after deductible, limited to 30 sessions per year
- Cognitive rehabilitation: Not covered

INPATIENT CARE:
- Skilled nursing facility: Covered at 80% after deductible for up to 100 days per benefit period
- Assisted living facility: Not covered under medical benefits
- Nursing home care: Limited coverage for skilled nursing only, not custodial care

DURABLE MEDICAL EQUIPMENT:
- Covered at 80% after deductible
- Requires prior authorization for items over $500
- Includes wheelchairs, hospital beds, oxygen equipment

FINANCIAL INFORMATION:
- Annual deductible: $1,500 individual / $3,000 family
- Co-insurance: 20% for most covered services
- Out-of-pocket maximum: $5,000 individual / $10,000 family per year
- Prior authorization required for certain services

EXCLUSIONS:
- Custodial care not covered
- Experimental treatments not covered
- Cosmetic services not covered
- Services not deemed medically necessary
`;

    // Initialize OpenAI client (using mock for demo purposes)
    // In production, use real OpenAI client:
    // const openai = new OpenAI({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
    
    // Using mock for demo purposes
    const openai = new MockOpenAI();

    // Call OpenAI API
    const response = await openai.chat.completions.create();

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