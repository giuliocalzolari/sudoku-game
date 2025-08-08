import React from 'react';
import { SudokuCell } from './SudokuCell';
import type { Board } from '../types/sudoku';

interface SudokuGridProps {
  board: Board;
  selectedCell: { row: number; col: number } | null;
  isKidsMode?: boolean;
  gridSize?: number;
  onCellSelect: (row: number, col: number) => void;
  onCellValueChange: (row: number, col: number, value: number) => void;
}

export function SudokuGrid({ 
  board, 
  selectedCell, 
  isKidsMode = false,
  gridSize = 9,
  onCellSelect, 
  onCellValueChange 
}: SudokuGridProps) {
  const gridCols = isKidsMode ? 'grid-cols-6' : 'grid-cols-9';
  
  return (
    <div className="inline-block bg-gray-800 p-2 rounded-lg shadow-lg">
      <div className={`grid ${gridCols} gap-0`}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              isKidsMode={isKidsMode}
              gridSize={gridSize}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              onSelect={onCellSelect}
              onValueChange={onCellValueChange}
            />
          ))
        )}
      </div>
    </div>
  );
}