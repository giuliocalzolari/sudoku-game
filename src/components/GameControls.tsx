import React from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import type { Difficulty } from '../types/sudoku';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  isComplete: boolean;
}

export function GameControls({ 
  difficulty, 
  onDifficultyChange, 
  onNewGame, 
  isComplete 
}: GameControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-medium text-gray-700">Difficulty:</span>
        <div className="flex space-x-2">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                difficulty === level
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNewGame}
        className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <RotateCcw size={20} />
        <span>New Game</span>
      </button>

      {isComplete && (
        <div className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-yellow-900 rounded-lg font-bold shadow-lg animate-bounce">
          <Trophy size={24} />
          <span>Congratulations! Puzzle Complete!</span>
        </div>
      )}
    </div>
  );
}