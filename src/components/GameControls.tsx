import React from 'react';
import { RotateCcw, Trophy, Heart, Star, Sun, Moon, Flower, Zap } from 'lucide-react';
import type { Difficulty } from '../types/sudoku';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  isComplete: boolean;
  isKidsMode?: boolean;
}

export function GameControls({ 
  difficulty, 
  onDifficultyChange, 
  onNewGame, 
  isComplete,
  isKidsMode = false
}: GameControlsProps) {
  const kidsIcons = [Heart, Star, Sun, Moon, Flower, Zap];
  const kidsColors = ['text-red-500', 'text-yellow-500', 'text-orange-500', 'text-purple-500', 'text-pink-500', 'text-blue-500'];

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-medium text-gray-700">Difficulty:</span>
        <div className="flex space-x-2">
          {(['kids', 'easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                difficulty === level
                  ? level === 'kids' 
                    ? 'bg-green-500 text-white shadow-lg transform scale-105'
                    : 'bg-blue-500 text-white shadow-lg transform scale-105'
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
        className={`flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
          isKidsMode ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        <RotateCcw size={20} />
        <span>New Game</span>
      </button>

      {isComplete && (
        <div className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-yellow-900 rounded-lg font-bold shadow-lg animate-bounce">
          <Trophy size={24} />
          <span>{isKidsMode ? 'Amazing! You did it!' : 'Congratulations! Puzzle Complete!'}</span>
        </div>
      )}

      {isKidsMode && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Icon Guide</h3>
          <div className="grid grid-cols-3 gap-3">
            {kidsIcons.map((Icon, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon className={`w-6 h-6 ${kidsColors[index]}`} />
                <span className="text-sm text-gray-600">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}