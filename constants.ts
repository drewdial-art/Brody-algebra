import { Question, StageType } from './types';
import { Rocket, Calculator, Braces, Scale } from 'lucide-react';

export const STAGE_CONFIG = [
  {
    id: StageType.TWO_STEP,
    title: "Stage 1: Two-Step Igniters",
    description: "Isolate the variable using inverse operations.",
    icon: Rocket,
    color: "text-blue-400",
    bg: "bg-blue-500"
  },
  {
    id: StageType.DISTRIBUTIVE,
    title: "Stage 2: Distributive De-couplers",
    description: "Clear parentheses before solving.",
    icon: Braces,
    color: "text-yellow-400",
    bg: "bg-yellow-500"
  },
  {
    id: StageType.COMBINING_LIKE,
    title: "Stage 3: Like-Term Linkers",
    description: "Simplify the equation on one side.",
    icon: Calculator,
    color: "text-purple-400",
    bg: "bg-purple-500"
  },
  {
    id: StageType.VARIABLES_BOTH,
    title: "Stage 4: Variable Stabilizers",
    description: "Get all variable terms on one side.",
    icon: Scale,
    color: "text-red-400",
    bg: "bg-red-500"
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // Stage 1: Two-Step Equations
  {
    id: '1-1',
    stage: StageType.TWO_STEP,
    prompt: "Solve for x",
    equation: "5x + 12 = 37",
    correctAnswer: 5,
    hint: "Subtract 12 from both sides first.",
    steps: [
      "Subtract 12 from both sides: 5x = 25",
      "Divide by 5: x = 5"
    ]
  },
  {
    id: '1-2',
    stage: StageType.TWO_STEP,
    prompt: "Solve for m",
    equation: "2m - 4 = 10",
    correctAnswer: 7,
    hint: "Add 4 to both sides.",
    steps: [
      "Add 4 to both sides: 2m = 14",
      "Divide by 2: m = 7"
    ]
  },
  {
    id: '1-3',
    stage: StageType.TWO_STEP,
    prompt: "Solve for y",
    equation: "y/2 + 3 = 8",
    correctAnswer: 10,
    hint: "Subtract 3, then multiply by 2.",
    steps: [
      "Subtract 3 from both sides: y/2 = 5",
      "Multiply by 2: y = 10"
    ]
  },

  // Stage 2: Distributive Property
  {
    id: '2-1',
    stage: StageType.DISTRIBUTIVE,
    prompt: "Solve for n",
    equation: "3(n - 5) = 24",
    correctAnswer: 13,
    hint: "Distribute the 3 first: 3n - 15 = 24.",
    steps: [
      "Distribute the 3: 3n - 15 = 24",
      "Add 15 to both sides: 3n = 39",
      "Divide by 3: n = 13"
    ]
  },
  {
    id: '2-2',
    stage: StageType.DISTRIBUTIVE,
    prompt: "Solve for x",
    equation: "2(x + 4) = 20",
    correctAnswer: 6,
    hint: "Divide by 2 first OR distribute the 2.",
    steps: [
      "Divide both sides by 2: x + 4 = 10",
      "Subtract 4 from both sides: x = 6"
    ]
  },
  {
    id: '2-3',
    stage: StageType.DISTRIBUTIVE,
    prompt: "Solve for k",
    equation: "5(k - 2) = 15",
    correctAnswer: 5,
    hint: "5 times what equals 15?",
    steps: [
      "Divide both sides by 5: k - 2 = 3",
      "Add 2 to both sides: k = 5"
    ]
  },

  // Stage 3: Combining Like Terms
  {
    id: '3-1',
    stage: StageType.COMBINING_LIKE,
    prompt: "Solve for w",
    equation: "7w - 2w + 4 = 29",
    correctAnswer: 5,
    hint: "Combine 7w and -2w first.",
    steps: [
      "Combine like terms (7w - 2w): 5w + 4 = 29",
      "Subtract 4 from both sides: 5w = 25",
      "Divide by 5: w = 5"
    ]
  },
  {
    id: '3-2',
    stage: StageType.COMBINING_LIKE,
    prompt: "Solve for x",
    equation: "3x + 2x - 5 = 20",
    correctAnswer: 5,
    hint: "Add the x terms together.",
    steps: [
      "Combine like terms (3x + 2x): 5x - 5 = 20",
      "Add 5 to both sides: 5x = 25",
      "Divide by 5: x = 5"
    ]
  },
  {
    id: '3-3',
    stage: StageType.COMBINING_LIKE,
    prompt: "Solve for p",
    equation: "4p + 3p = 21",
    correctAnswer: 3,
    hint: "Combine like terms to get 7p = 21.",
    steps: [
      "Combine like terms: 7p = 21",
      "Divide by 7: p = 3"
    ]
  },

  // Stage 4: Variables on Both Sides
  {
    id: '4-1',
    stage: StageType.VARIABLES_BOTH,
    prompt: "Solve for y",
    equation: "2y + 10 = 5y - 2",
    correctAnswer: 4,
    hint: "Subtract 2y from both sides.",
    steps: [
      "Subtract 2y from both sides: 10 = 3y - 2",
      "Add 2 to both sides: 12 = 3y",
      "Divide by 3: y = 4"
    ]
  },
  {
    id: '4-2',
    stage: StageType.VARIABLES_BOTH,
    prompt: "Solve for x",
    equation: "5x + 3 = 2x + 18",
    correctAnswer: 5,
    hint: "Subtract 2x from both sides.",
    steps: [
      "Subtract 2x from both sides: 3x + 3 = 18",
      "Subtract 3 from both sides: 3x = 15",
      "Divide by 3: x = 5"
    ]
  },
  {
    id: '4-3',
    stage: StageType.VARIABLES_BOTH,
    prompt: "Find w (weeks)",
    equation: "50 + 5.5w = 18.5 + 7.75w",
    correctAnswer: 14,
    hint: "Subtract 5.5w from 7.75w.",
    steps: [
      "Subtract 5.5w from both sides: 50 = 18.5 + 2.25w",
      "Subtract 18.5 from both sides: 31.5 = 2.25w",
      "Divide by 2.25: w = 14"
    ]
  }
];
