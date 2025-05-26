// Mock OpenAI implementation for testing
class MockOpenAI {
  apiKey: string;

  constructor(options: { apiKey?: string } = {}) {
    this.apiKey = options.apiKey || "mock-key";
  }

  chat = {
    completions: {
      create: async () => {
        // Simulate API response
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
}

export default MockOpenAI; 