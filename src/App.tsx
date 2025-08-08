import React from 'react';
import { SudokuGrid } from './components/SudokuGrid';
import { GameControls } from './components/GameControls';
import { useSudoku } from './hooks/useSudoku';

function App() {
  const { gameState, newGame, selectCell, updateCell, changeDifficulty } = useSudoku('medium');
  const isKidsMode = gameState.difficulty === 'kids';

  return (
    <div className={`min-h-screen py-8 px-4 ${
      isKidsMode 
        ? 'bg-gradient-to-br from-green-50 to-yellow-100' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${
            isKidsMode ? 'text-green-800' : 'text-gray-800'
          }`}>
            {isKidsMode ? 'Kids Sudoku Fun!' : 'Sudoku Master'}
          </h1>
          <p className="text-gray-600">
            {isKidsMode 
              ? 'Match the colorful icons in each row, column, and box!' 
              : 'Challenge your mind with this classic number puzzle'
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="flex-shrink-0">
            <SudokuGrid
              board={gameState.board}
              selectedCell={gameState.selectedCell}
              isKidsMode={isKidsMode}
              gridSize={gameState.gridSize}
              onCellSelect={selectCell}
              onCellValueChange={updateCell}
            />
          </div>

          <div className="flex-shrink-0">
            <GameControls
              difficulty={gameState.difficulty}
              onDifficultyChange={changeDifficulty}
              onNewGame={() => newGame()}
              isComplete={gameState.isComplete}
              isKidsMode={isKidsMode}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          {isKidsMode ? (
            <>
              <p className="mb-2">
                <strong>How to play:</strong> Fill the 6×6 grid so that each row, column, and 2×3 section contains all 6 different icons.
              </p>
              <p>
                Click on empty cells and type numbers 1-6 to place icons. Green cells show the starting icons.
              </p>
            </>
          ) : (
            <>
              <p className="mb-2">
                <strong>How to play:</strong> Fill the 9×9 grid so that each row, column, and 3×3 section contains all digits from 1 to 9.
              </p>
              <p>
                Use your mouse to select cells and type numbers, or use arrow keys to navigate.
                Blue cells contain the original puzzle numbers and cannot be changed.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;