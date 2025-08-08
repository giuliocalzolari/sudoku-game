import React from 'react';
import { Heart, Star, Sun, Moon, Flower, Zap } from 'lucide-react';
import type { Cell } from '../types/sudoku';

interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  isSelected: boolean;
  isKidsMode?: boolean;
  gridSize?: number;
  onSelect: (row: number, col: number) => void;
  onValueChange: (row: number, col: number, value: number) => void;
}

const kidsIcons = [
  null, // 0 - empty
  Heart,   // 1
  Star,    // 2
  Sun,     // 3
  Moon,    // 4
  Flower,  // 5
  Zap      // 6
];

const kidsColors = [
  '', // 0 - empty
  'text-red-500',    // 1 - Heart
  'text-yellow-500', // 2 - Star
  'text-orange-500', // 3 - Sun
  'text-purple-500', // 4 - Moon
  'text-pink-500',   // 5 - Flower
  'text-blue-500'    // 6 - Zap
];

export function SudokuCell({ 
  cell, 
  row, 
  col, 
  isSelected, 
  isKidsMode = false,
  gridSize = 9,
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
    const maxValue = isKidsMode ? 6 : 9;
    if (key >= '1' && key <= maxValue.toString()) {
      onValueChange(row, col, parseInt(key));
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      onValueChange(row, col, 0);
    }
  };

  const getCellClassName = () => {
    const cellSize = isKidsMode ? "w-16 h-16" : "w-12 h-12";
    const baseClasses = `${cellSize} border border-gray-300 flex items-center justify-center text-lg font-semibold cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`;
    
    let classes = baseClasses;
    
    // Cell background and text color
    if (cell.isGiven) {
      classes += isKidsMode ? " bg-green-50 cursor-default" : " bg-blue-50 text-blue-900 font-bold cursor-default";
    } else {
      classes += isKidsMode ? " bg-white hover:bg-green-50" : " bg-white text-gray-800 hover:bg-blue-50";
    }
    
    // Selection state
    if (isSelected && !cell.isGiven) {
      classes += isKidsMode ? " ring-2 ring-green-500 bg-green-100" : " ring-2 ring-blue-500 bg-blue-100";
    }
    
    // Validation state
    if (!cell.isValid) {
      classes += " bg-red-100 text-red-700";
    }
    
    // Grid borders for sections
    if (isKidsMode) {
      // 2x3 sections for 6x6 grid
      if (row % 2 === 0) classes += " border-t-2 border-t-gray-800";
      if (col % 3 === 0) classes += " border-l-2 border-l-gray-800";
      if (row === 5) classes += " border-b-2 border-b-gray-800";
      if (col === 5) classes += " border-r-2 border-r-gray-800";
    } else {
      // 3x3 sections for 9x9 grid
      if (row % 3 === 0) classes += " border-t-2 border-t-gray-800";
      if (col % 3 === 0) classes += " border-l-2 border-l-gray-800";
      if (row === 8) classes += " border-b-2 border-b-gray-800";
      if (col === 8) classes += " border-r-2 border-r-gray-800";
    }
    
    return classes;
  };

  const renderCellContent = () => {
    if (cell.value === 0) return '';
    
    if (isKidsMode) {
      const IconComponent = kidsIcons[cell.value];
      const iconColor = kidsColors[cell.value];
      return IconComponent ? <IconComponent className={`w-8 h-8 ${iconColor}`} /> : '';
    }
    
    return cell.value;
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
      {renderCellContent()}
    </div>
  );
}