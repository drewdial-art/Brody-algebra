export enum StageType {
  TWO_STEP = 'TWO_STEP',
  DISTRIBUTIVE = 'DISTRIBUTIVE',
  COMBINING_LIKE = 'COMBINING_LIKE',
  VARIABLES_BOTH = 'VARIABLES_BOTH'
}

export interface Question {
  id: string;
  stage: StageType;
  prompt: string;
  equation: string;
  correctAnswer: number;
  placeholder?: string;
  hint?: string;
  steps: string[]; // Array of strings representing the solution steps
}

export interface GameState {
  currentStageIndex: number;
  currentQuestionIndex: number;
  score: number;
  fuelLevel: number; // 0 to 100
  isLaunched: boolean;
  gameStatus: 'intro' | 'playing' | 'completed';
  commanderName: string;
}

export interface Feedback {
  type: 'success' | 'error' | 'info';
  message: string;
}