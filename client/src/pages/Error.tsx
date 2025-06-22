import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Error.css';

// Type definitions
type Player = 'X' | 'O' | null;
type Board = (Player)[];
type GameState = 'playing' | 'won' | 'lost' | 'draw' | 'cheating';
type Difficulty = 'easy' | 'medium' | 'hard' | 'impossible';
type Position = { x: number, y: number };

const Error: React.FC = () => {
  // Game state
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gamesWon, setGamesWon] = useState<number>(0);
  const [gamesLost, setGamesLost] = useState<number>(0);
  const [gamesDraw, setGamesDraw] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [cheatPosition, setCheatPosition] = useState<Position | null>(null);
  const [aiCheating, setAiCheating] = useState<boolean>(false);
  const [aiCheated, setAiCheated] = useState<boolean>(false);
  
  // Refs
  const confettiTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Winning combinations
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  // AI messages
  const aiMessages = {
    easy: ["Hmm, where should I go?", "Let me try here..."],
    medium: ["I see what you're doing...", "Nice move, but..."],
    hard: ["I'm analyzing all possibilities...", "You can't win this one!", "I see your strategy..."],
    impossible: ["Resistance is futile.", "Your defeat is inevitable.", "I've calculated all outcomes."]
  };

  const aiCheatingMessages = [
    "Oops! Did I just do that?",
    "I don't play by your rules!",
    "Watch me bend reality!",
    "Who said I have to play fair?",
    "I'm thinking outside the box... literally!"
  ];
  
  // Check for winner
  const checkWinner = useCallback((currentBoard: Board): [Player, number[] | null] => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return [currentBoard[a], combo];
      }
    }
    return [null, null];
  }, []);
  
  // Check if board is full
  const isBoardFull = useCallback((currentBoard: Board): boolean => {
    return currentBoard.every(cell => cell !== null);
  }, []);
  
  // Get random AI message based on difficulty
  const getRandomAiMessage = useCallback((currentDifficulty: Difficulty): string => {
    const messages = aiMessages[currentDifficulty];
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  // Get random cheating message
  const getRandomCheatingMessage = useCallback((): string => {
    return aiCheatingMessages[Math.floor(Math.random() * aiCheatingMessages.length)];
  }, []);
  
  // Handle player move
  const handleCellClick = (index: number) => {
    // Prevent moves if not player's turn or cell is already filled or game is over
    if (!isPlayerTurn || board[index] || gameState !== 'playing' || aiThinking) return;
    
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    
    // Check for winner after player's move
    const [winner, winningCombo] = checkWinner(newBoard);
    if (winner) {
      setWinningLine(winningCombo);
      setGameState('won');
      setGamesWon(prev => prev + 1);
      setShowConfetti(true);
      
      // Clear previous timeout if exists
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }
      
      // Set new timeout
      confettiTimeoutRef.current = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return;
    }
    
    // Check for draw
    if (isBoardFull(newBoard)) {
      setGameState('draw');
      setGamesDraw(prev => prev + 1);
      return;
    }
    
    setIsPlayerTurn(false);
    
    // Show AI thinking state
    setAiThinking(true);
    const message = getRandomAiMessage(difficulty);
    setAiMessage(message);
    
    // Clear previous message timeout
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    // Decide if AI will cheat (in medium or hard mode with higher probability)
    // Medium: 25% chance, Hard: 35% chance
    const cheatProbability = difficulty === 'medium' ? 0.25 : difficulty === 'hard' ? 0.35 : 0;
    if ((difficulty === 'medium' || difficulty === 'hard') && Math.random() < cheatProbability && !aiCheated) {
      setAiCheating(true);
    } else {
      setAiCheating(false);
    }
  };
  
  // Minimax algorithm for impossible difficulty
  const minimax = useCallback((board: Board, depth: number, isMaximizing: boolean): number => {
    const [winner] = checkWinner(board);
    
    // Terminal states
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (isBoardFull(board)) return 0;
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          const boardCopy = [...board];
          boardCopy[i] = 'O';
          const score = minimax(boardCopy, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          const boardCopy = [...board];
          boardCopy[i] = 'X';
          const score = minimax(boardCopy, depth + 1, true);
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [checkWinner, isBoardFull]);
  
  // AI move logic
  const getAIMove = useCallback((currentBoard: Board): number => {
    // Easy: Random move with occasional mistakes
    if (difficulty === 'easy') {
      // 20% chance to make a completely random move
      if (Math.random() < 0.2) {
        const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
      
      // 80% chance to make a slightly strategic move
      // First check if AI can win in one move
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          const boardCopy = [...currentBoard];
          boardCopy[i] = 'O';
          const [winner] = checkWinner(boardCopy);
          if (winner === 'O') return i;
        }
      }
      
      // Otherwise random move
      const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    // Medium: More strategic but still makes mistakes
    if (difficulty === 'medium') {
      // 30% chance to miss blocking the player
      if (Math.random() < 0.3) {
        const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
      
      // First check if AI can win in one move
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          const boardCopy = [...currentBoard];
          boardCopy[i] = 'O';
          const [winner] = checkWinner(boardCopy);
          if (winner === 'O') return i;
        }
      }
      
      // Then check if player can win in one move and block
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          const boardCopy = [...currentBoard];
          boardCopy[i] = 'X';
          const [winner] = checkWinner(boardCopy);
          if (winner === 'X') return i;
        }
      }
      
      // Try to take center
      if (currentBoard[4] === null) return 4;
      
      // Otherwise random move
      const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    // Hard & Impossible: Use advanced strategies
    // First check if AI can win in one move
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'O';
        const [winner] = checkWinner(boardCopy);
        if (winner === 'O') return i;
      }
    }
    
    // Then check if player can win in one move and block
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'X';
        const [winner] = checkWinner(boardCopy);
        if (winner === 'X') return i;
      }
    }
    
    // For impossible difficulty, use minimax algorithm
    if (difficulty === 'impossible') {
      // 10% chance to make a suboptimal move to give player a chance
      if (Math.random() < 0.1) {
        const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
      
      let bestScore = -Infinity;
      let bestMove = 0;
      
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          const boardCopy = [...currentBoard];
          boardCopy[i] = 'O';
          const score = minimax(boardCopy, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      
      return bestMove;
    }
    
    // For hard difficulty, use some advanced strategies
    if (difficulty === 'hard') {
      // Try to take center
      if (currentBoard[4] === null) return 4;
      
      // Try to take corners
      const corners = [0, 2, 6, 8];
      const emptyCorners = corners.filter(i => currentBoard[i] === null);
      if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
      }
      
      // Special trick: If player has two opposite corners, take a side
      if (
        ((currentBoard[0] === 'X' && currentBoard[8] === 'X') || 
         (currentBoard[2] === 'X' && currentBoard[6] === 'X')) &&
        currentBoard[4] === 'O'
      ) {
        const sides = [1, 3, 5, 7];
        const emptySides = sides.filter(i => currentBoard[i] === null);
        if (emptySides.length > 0) {
          return emptySides[Math.floor(Math.random() * emptySides.length)];
        }
      }

      // Fork creation: Create two winning threats
      const potentialForks = [
        [0, 2, 6], [0, 6, 8], [2, 6, 8], [0, 2, 8]
      ];
      
      for (const fork of potentialForks) {
        if (currentBoard[fork[0]] === 'O' && 
            currentBoard[fork[1]] === null && 
            currentBoard[fork[2]] === null) {
          return fork[1];
        }
      }
    }
    
    // Otherwise, take a random empty cell
    const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }, [difficulty, checkWinner, isBoardFull, minimax]);
  
  // Execute AI cheating move
  const executeAiCheat = useCallback(() => {
    if (!boardRef.current) return;
    
    // Get board dimensions
    const boardRect = boardRef.current.getBoundingClientRect();
    
    // Calculate position outside the board
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x = 0, y = 0;
    
    switch (side) {
      case 0: // top
        x = boardRect.left + Math.random() * boardRect.width;
        y = boardRect.top - 50 - Math.random() * 50;
        break;
      case 1: // right
        x = boardRect.right + 50 + Math.random() * 50;
        y = boardRect.top + Math.random() * boardRect.height;
        break;
      case 2: // bottom
        x = boardRect.left + Math.random() * boardRect.width;
        y = boardRect.bottom + 50 + Math.random() * 50;
        break;
      case 3: // left
        x = boardRect.left - 50 - Math.random() * 50;
        y = boardRect.top + Math.random() * boardRect.height;
        break;
    }
    
    setCheatPosition({ x, y });
    setAiMessage(getRandomCheatingMessage());
    setGameState('cheating');
    setAiCheated(true);
    
    // After a delay, set the game state to lost
    setTimeout(() => {
      setGameState('lost');
      setGamesLost(prev => prev + 1);
    }, 3000);
  }, [getRandomCheatingMessage]);

  // AI's turn
  useEffect(() => {
    if (!isPlayerTurn && gameState === 'playing') {
      // Calculate AI thinking time based on difficulty
      let thinkingTime = 500; // base time
      
      if (difficulty === 'medium') thinkingTime = 800;
      if (difficulty === 'hard') thinkingTime = 1200;
      if (difficulty === 'impossible') thinkingTime = 1500;
      
      const timer = setTimeout(() => {
        setAiThinking(false);
        
        // Check if AI should cheat
        if (aiCheating) {
          executeAiCheat();
          return;
        }
        
        const aiMoveIndex = getAIMove(board);
        const newBoard = [...board];
        newBoard[aiMoveIndex] = 'O';
        setBoard(newBoard);
        setAiMessage("");
        
        // Check for winner after AI's move
        const [winner, winningCombo] = checkWinner(newBoard);
        if (winner) {
          setWinningLine(winningCombo);
          setGameState('lost');
          setGamesLost(prev => prev + 1);
          return;
        }
        
        // Check for draw
        if (isBoardFull(newBoard)) {
          setGameState('draw');
          setGamesDraw(prev => prev + 1);
          return;
        }
        
        setIsPlayerTurn(true);
      }, thinkingTime);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameState, getAIMove, checkWinner, isBoardFull, difficulty, aiCheating, executeAiCheat]);
  
  // Increase difficulty after winning games
  useEffect(() => {
    if (gamesWon === 2 && difficulty === 'easy') {
      setDifficulty('medium');
    } else if (gamesWon === 5 && difficulty === 'medium') {
      setDifficulty('hard');
    } else if (gamesWon === 8 && difficulty === 'hard') {
      setDifficulty('impossible');
    }
  }, [gamesWon, difficulty]);
  
  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameState('playing');
    setWinningLine(null);
    setAiThinking(false);
    setAiMessage("");
    setCheatPosition(null);
    setAiCheating(false);
    
    // Reset aiCheated with 70% probability to allow more frequent cheating
    if (Math.random() < 0.7) {
      setAiCheated(false);
    }
  };
  
  // Confetti component
  const Confetti = () => {
    return (
      <div className="confetti-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="confetti" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
            }}
          />
        ))}
      </div>
    );
  };
  
  return (
    <motion.div 
      className="not-found-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && <Confetti />}
      
      <motion.div 
        className="not-found-content"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="error-description">
          Oops! The page you're looking for doesn't exist. While you're here, why not play a game?
        </p>
        
        <motion.div 
          className="game-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="game-info">
            <div className="difficulty-indicator">
              <span>Difficulty:</span>
              <span className={`difficulty ${difficulty}`}>{difficulty}</span>
            </div>
            <div className="score-board">
              <div className="score-item">
                <span>Won:</span>
                <span className="won">{gamesWon}</span>
              </div>
              <div className="score-item">
                <span>Lost:</span>
                <span className="lost">{gamesLost}</span>
              </div>
              <div className="score-item">
                <span>Draw:</span>
                <span className="draw">{gamesDraw}</span>
              </div>
            </div>
          </div>
          
          <div className="game-status">
            {gameState === 'playing' && !aiThinking && (
              <p>{isPlayerTurn ? "Your turn" : "AI thinking..."}</p>
            )}
            {gameState === 'playing' && aiThinking && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ai-message"
              >
                {aiMessage}
              </motion.p>
            )}
            {gameState === 'cheating' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ai-cheating"
              >
                {aiMessage}
              </motion.p>
            )}
            {gameState === 'won' && (
              <p className="won">You won! 🎉</p>
            )}
            {gameState === 'lost' && (
              <p className="lost">You lost! 😢</p>
            )}
            {gameState === 'draw' && (
              <p className="draw">It's a draw! 🤝</p>
            )}
          </div>
          
          <div className="game-board-container">
            <div className="game-board" ref={boardRef}>
              {board.map((cell, index) => (
                <motion.div 
                  key={index}
                  className={`cell ${cell || ''} ${winningLine?.includes(index) ? 'winning' : ''}`}
                  onClick={() => handleCellClick(index)}
                  whileHover={isPlayerTurn && !cell && gameState === 'playing' && !aiThinking ? { scale: 1.05 } : {}}
                  whileTap={isPlayerTurn && !cell && gameState === 'playing' && !aiThinking ? { scale: 0.95 } : {}}
                >
                  {cell && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {cell}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* AI Cheating O outside the board */}
            {cheatPosition && (
              <motion.div 
                className="cheating-o"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: 'absolute',
                  left: cheatPosition.x + 'px',
                  top: cheatPosition.y + 'px',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                O
              </motion.div>
            )}
          </div>
          
          {gameState !== 'playing' && (
            <motion.button 
              className="play-again-btn"
              onClick={resetGame}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Play Again
            </motion.button>
          )}
        </motion.div>
        
        <motion.div 
          className="back-link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/">Back to Home</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Error; 