import { StandardAnswerCategory } from "@/lib/types";

export type StandardAnswerCategoryResponse =
  | EEStandardAnswerCategoryResponse
  | NoEEAvailable;

interface NoEEAvailable {
  paidEnterpriseFeaturesEnabled: false;
}

interface EEStandardAnswerCategoryResponse {
  paidEnterpriseFeaturesEnabled: true;
  error?: {
    message: string;
  };
  categories?: StandardAnswerCategory[];
}

// Standard answers were an Enterprise feature; the barebones build never has
// them, so this always reports the feature as unavailable.
export async function getStandardAnswerCategoriesIfEE(): Promise<StandardAnswerCategoryResponse> {
  return {
    paidEnterpriseFeaturesEnabled: false,
  };
}
