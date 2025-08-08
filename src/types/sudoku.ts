export type Difficulty = 'kids' | 'easy' | 'medium' | 'hard';

export interface Cell {
  value: number;
  isGiven: boolean;
  isValid: boolean;
}

export type Board = Cell[][];

export interface GameState {
  board: Board;
  difficulty: Difficulty;
  isComplete: boolean;
  selectedCell: { row: number; col: number } | null;
  gridSize: number;
}