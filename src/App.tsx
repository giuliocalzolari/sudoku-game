import React from 'react';
import { SudokuGrid } from './components/SudokuGrid';
import { GameControls } from './components/GameControls';
import { useSudoku } from './hooks/useSudoku';

function App() {
  const { gameState, newGame, selectCell, updateCell, changeDifficulty } = useSudoku('medium');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sudoku Master</h1>
          <p className="text-gray-600">Challenge your mind with this classic number puzzle</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="flex-shrink-0">
            <SudokuGrid
              board={gameState.board}
              selectedCell={gameState.selectedCell}
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
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          <p className="mb-2">
            <strong>How to play:</strong> Fill the 9×9 grid so that each row, column, and 3×3 section contains all digits from 1 to 9.
          </p>
          <p>
            Use your mouse to select cells and type numbers, or use arrow keys to navigate.
            Blue cells contain the original puzzle numbers and cannot be changed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;