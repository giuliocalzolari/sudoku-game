import React from 'react';
import { SudokuCell } from './SudokuCell';
import type { Board } from '../types/sudoku';

interface SudokuGridProps {
  board: Board;
  selectedCell: { row: number; col: number } | null;
  onCellSelect: (row: number, col: number) => void;
  onCellValueChange: (row: number, col: number, value: number) => void;
}

export function SudokuGrid({ 
  board, 
  selectedCell, 
  onCellSelect, 
  onCellValueChange 
}: SudokuGridProps) {
  return (
    <div className="inline-block bg-gray-800 p-2 rounded-lg shadow-lg">
      <div className="grid grid-cols-9 gap-0">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
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