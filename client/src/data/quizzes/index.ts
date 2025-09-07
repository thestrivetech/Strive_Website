// Export all quiz types
export * from './types';

// Export individual quizzes
export { mlFundamentals } from './ml-fundamentals';
export { ragRetrievalAugmented } from './rag-retrieval-augmented';
export { neuralNetworksDeepLearning } from './neural-networks-deep-learning';
export { naturalLanguageProcessing } from './natural-language-processing';
export { aiModelArchitectures } from './ai-model-architectures';
export { aiEthicsApplications } from './ai-ethics-applications';

// Import for array creation
import { mlFundamentals } from './ml-fundamentals';
import { ragRetrievalAugmented } from './rag-retrieval-augmented';
import { neuralNetworksDeepLearning } from './neural-networks-deep-learning';
import { naturalLanguageProcessing } from './natural-language-processing';
import { aiModelArchitectures } from './ai-model-architectures';
import { aiEthicsApplications } from './ai-ethics-applications';

// Export all quizzes as an array for convenience
export const allQuizzes = [
  mlFundamentals,
  ragRetrievalAugmented,
  neuralNetworksDeepLearning,
  naturalLanguageProcessing,
  aiModelArchitectures,
  aiEthicsApplications
];