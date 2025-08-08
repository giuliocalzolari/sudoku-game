import React from 'react';
import type { Cell } from '../types/sudoku';

interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  isSelected: boolean;
  onSelect: (row: number, col: number) => void;
  onValueChange: (row: number, col: number, value: number) => void;
}

export function SudokuCell({ 
  cell, 
  row, 
  col, 
  isSelected, 
  onSelect, 
  onValueChange 
}: SudokuCellProps) {
  const handleClick = () => {
    if (!cell.isGiven) {
      onSelect(row, col);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (cell.isGiven) return;

    const key = e.key;
    if (key >= '1' && key <= '9') {
      onValueChange(row, col, parseInt(key));
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      onValueChange(row, col, 0);
    }
  };

  const getCellClassName = () => {
    const baseClasses = "w-12 h-12 border border-gray-300 flex items-center justify-center text-lg font-semibold cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    let classes = baseClasses;
    
    // Cell background and text color
    if (cell.isGiven) {
      classes += " bg-blue-50 text-blue-900 font-bold cursor-default";
    } else {
      classes += " bg-white text-gray-800 hover:bg-blue-50";
    }
    
    // Selection state
    if (isSelected && !cell.isGiven) {
      classes += " ring-2 ring-blue-500 bg-blue-100";
    }
    
    // Validation state
    if (!cell.isValid) {
      classes += " bg-red-100 text-red-700";
    }
    
    // Grid borders for 3x3 sections
    if (row % 3 === 0) classes += " border-t-2 border-t-gray-800";
    if (col % 3 === 0) classes += " border-l-2 border-l-gray-800";
    if (row === 8) classes += " border-b-2 border-b-gray-800";
    if (col === 8) classes += " border-r-2 border-r-gray-800";
    
    return classes;
  };

  return (
    <div
      className={getCellClassName()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={cell.isGiven ? -1 : 0}
      role="button"
      aria-label={`Cell ${row + 1}, ${col + 1}`}
    >
      {cell.value === 0 ? '' : cell.value}
    </div>
  );
}