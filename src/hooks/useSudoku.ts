import { useState, useCallback, useEffect } from 'react';
import type { GameState, Difficulty, Board } from '../types/sudoku';
import { createPuzzle, validateBoard, isPuzzleComplete } from '../utils/sudokuGenerator';

export function useSudoku(initialDifficulty: Difficulty = 'medium') {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createPuzzle(initialDifficulty),
    difficulty: initialDifficulty,
    isComplete: false,
    selectedCell: null
  }));

  const newGame = useCallback((difficulty?: Difficulty) => {
    const newDifficulty = difficulty || gameState.difficulty;
    const newBoard = createPuzzle(newDifficulty);
    
    setGameState({
      board: newBoard,
      difficulty: newDifficulty,
      isComplete: false,
      selectedCell: null
    });
  }, [gameState.difficulty]);

  const selectCell = useCallback((row: number, col: number) => {
    setGameState(prev => ({
      ...prev,
      selectedCell: { row, col }
    }));
  }, []);

  const updateCell = useCallback((row: number, col: number, value: number) => {
    setGameState(prev => {
      const newBoard: Board = prev.board.map((boardRow, r) =>
        boardRow.map((cell, c) => {
          if (r === row && c === col && !cell.isGiven) {
            return { ...cell, value };
          }
          return { ...cell };
        })
      );

      const validatedBoard = validateBoard(newBoard);
      const isComplete = isPuzzleComplete(validatedBoard);

      return {
        ...prev,
        board: validatedBoard,
        isComplete
      };
    });
  }, []);

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    newGame(difficulty);
  }, [newGame]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.selectedCell) return;

      const { row, col } = gameState.selectedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          e.preventDefault();
          break;
        case 'ArrowDown':
          newRow = Math.min(8, row + 1);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          e.preventDefault();
          break;
        case 'ArrowRight':
          newCol = Math.min(8, col + 1);
          e.preventDefault();
          break;
      }

      if (newRow !== row || newCol !== col) {
        selectCell(newRow, newCol);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.selectedCell, selectCell]);

  return {
    gameState,
    newGame,
    selectCell,
    updateCell,
    changeDifficulty
  };
}