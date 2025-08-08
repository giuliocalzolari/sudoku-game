import type { Board, Difficulty } from '../types/sudoku';

// Generate a complete valid 6x6 Sudoku board for kids mode
export function generateComplete6x6Board(): number[][] {
  const board: number[][] = Array(6).fill(null).map(() => Array(6).fill(0));
  
  // Fill the board with a valid solution
  fill6x6Board(board);
  return board;
}

function fill6x6Board(board: number[][]): boolean {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6]);
        for (const num of numbers) {
          if (isValid6x6Move(board, row, col, num)) {
            board[row][col] = num;
            if (fill6x6Board(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Generate a complete valid Sudoku board
export function generateCompleteBoard(): number[][] {
  const board: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  
  // Fill the board with a valid solution
  fillBoard(board);
  return board;
}

function fillBoard(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create a puzzle by removing numbers from a complete board
export function createPuzzle(difficulty: Difficulty): Board {
  const isKidsMode = difficulty === 'kids';
  const completeBoard = isKidsMode ? generateComplete6x6Board() : generateCompleteBoard();
  const puzzle: Board = completeBoard.map(row =>
    row.map(value => ({ value, isGiven: true, isValid: true }))
  );

  // Determine how many cells to remove based on difficulty
  const cellsToRemove = {
    kids: 15,
    easy: 35,
    medium: 45,
    hard: 55
  }[difficulty];

  const gridSize = isKidsMode ? 6 : 9;
  // Remove numbers randomly
  const positions = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      positions.push({ row, col });
    }
  }

  const shuffledPositions = shuffle(positions);
  for (let i = 0; i < cellsToRemove; i++) {
    const { row, col } = shuffledPositions[i];
    puzzle[row][col] = { value: 0, isGiven: false, isValid: true };
  }

  return puzzle;
}

// Validate a move in the 6x6 Sudoku board
export function isValid6x6Move(board: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 6; c++) {
    if (c !== col && board[row][c] === num) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < 6; r++) {
    if (r !== row && board[r][col] === num) {
      return false;
    }
  }

  // Check 2x3 box
  const boxRow = Math.floor(row / 2) * 2;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 2; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === num) {
        return false;
      }
    }
  }

  return true;
}

// Validate a move in the Sudoku board
export function isValidMove(board: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === num) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === num) {
        return false;
      }
    }
  }

  return true;
}

// Validate the entire board and mark conflicts
export function validateBoard(board: Board, gridSize: number = 9): Board {
  const validatedBoard = board.map(row => [...row]);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = validatedBoard[row][col];
      if (cell.value !== 0) {
        const numBoard = board.map(r => r.map(c => c.value));
        cell.isValid = gridSize === 6 
          ? isValid6x6Move(numBoard, row, col, cell.value)
          : isValidMove(numBoard, row, col, cell.value);
      } else {
        cell.isValid = true;
      }
    }
  }

  return validatedBoard;
}

// Check if the puzzle is complete
export function isPuzzleComplete(board: Board, gridSize: number = 9): boolean {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = board[row][col];
      if (cell.value === 0 || !cell.isValid) {
        return false;
      }
    }
  }
  return true;
}