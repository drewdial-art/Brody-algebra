import React, { useState, useMemo } from 'react';
import { RocketDisplay } from './components/RocketDisplay';
import { MissionControl } from './components/MissionControl';
import { GameState, StageType } from './types';
import { INITIAL_QUESTIONS, STAGE_CONFIG } from './constants';
import { Rocket, Trophy, Play } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStageIndex: 0,
    currentQuestionIndex: 0,
    score: 0,
    fuelLevel: 0,
    isLaunched: false,
    gameStatus: 'intro',
    commanderName: ''
  });

  // Calculate fuel increment based on total questions to reach 100% exactly at the end
  const totalQuestions = INITIAL_QUESTIONS.length;
  const fuelPerQuestion = 100 / totalQuestions;

  // Filter questions for the current stage
  const currentStageId = STAGE_CONFIG[gameState.currentStageIndex].id;
  const stageQuestions = useMemo(() => 
    INITIAL_QUESTIONS.filter(q => q.stage === currentStageId),
  [currentStageId]);
  
  // Get actual current question object
  // Since we filter by stage, we need to track local index within the stage
  const [stageQuestionIndex, setStageQuestionIndex] = useState(0);
  const currentQuestion = stageQuestions[stageQuestionIndex];

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState.commanderName.trim().length > 0) {
      setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
    }
  };

  const handleCorrectAnswer = () => {
    // Update fuel
    const newFuel = Math.min(gameState.fuelLevel + fuelPerQuestion, 100);
    
    // Check if stage is complete
    const isStageComplete = stageQuestionIndex >= stageQuestions.length - 1;
    const isGameComplete = isStageComplete && gameState.currentStageIndex >= STAGE_CONFIG.length - 1;

    if (isGameComplete) {
      // Launch Sequence
      setGameState(prev => ({ 
        ...prev, 
        fuelLevel: 100,
        isLaunched: true 
      }));
      
      setTimeout(() => {
        setGameState(prev => ({ ...prev, gameStatus: 'completed' }));
      }, 3500); // Wait for animation
    } else if (isStageComplete) {
      // Advance Stage
      setGameState(prev => ({
        ...prev,
        fuelLevel: newFuel,
        currentStageIndex: prev.currentStageIndex + 1
      }));
      setStageQuestionIndex(0);
    } else {
      // Next Question in same stage
      setGameState(prev => ({
        ...prev,
        fuelLevel: newFuel,
      }));
      setStageQuestionIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setGameState({
      currentStageIndex: 0,
      currentQuestionIndex: 0,
      score: 0,
      fuelLevel: 0,
      isLaunched: false,
      gameStatus: 'intro',
      commanderName: ''
    });
    setStageQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500/30">
      
      {/* Intro Screen */}
      {gameState.gameStatus === 'intro' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative z-10 max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500">
            <div className="bg-blue-600/20 p-6 rounded-full w-32 h-32 mx-auto flex items-center justify-center border-2 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
              <Rocket size={64} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                ALGE-BLAST OFF
              </h1>
              <p className="text-xl text-gray-300 font-mono">Mission Control: 6th Grade</p>
            </div>
            
            <form onSubmit={handleStartGame} className="bg-gray-900/80 p-8 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-md">
              <label className="block text-left text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Commander Identification</label>
              <input 
                type="text" 
                required
                maxLength={15}
                placeholder="Enter Name..."
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none mb-6 text-center text-xl font-mono"
                value={gameState.commanderName}
                onChange={(e) => setGameState(prev => ({ ...prev, commanderName: e.target.value }))}
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                INITIALIZE MISSION <Play size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Game Screen */}
      {gameState.gameStatus === 'playing' && (
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col md:flex-row gap-8 items-center justify-center">
          
          {/* Left: Rocket Display */}
          <div className="w-full md:w-1/3 flex-shrink-0 order-2 md:order-1">
             <RocketDisplay 
                fuelLevel={gameState.fuelLevel} 
                isLaunched={gameState.isLaunched} 
                stageColor={STAGE_CONFIG[gameState.currentStageIndex].color}
             />
             <div className="mt-4 text-center font-mono text-sm text-gray-500">
                COMMANDER: {gameState.commanderName}
             </div>
          </div>

          {/* Right: Mission Control */}
          <div className="w-full md:w-2/3 order-1 md:order-2 flex justify-center">
            <MissionControl 
              currentQuestion={currentQuestion}
              onCorrectAnswer={handleCorrectAnswer}
              fuelLevel={Math.round(gameState.fuelLevel)}
            />
          </div>

        </div>
      )}

      {/* Success Screen */}
      {gameState.gameStatus === 'completed' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-900 to-black text-center animate-in fade-in duration-1000">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
            <Trophy size={120} className="text-yellow-400 relative z-10 drop-shadow-2xl" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            MISSION ACCOMPLISHED!
          </h1>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 max-w-lg w-full">
            <p className="text-2xl text-blue-200 mb-6 font-mono">
              Commander {gameState.commanderName} has successfully piloted the Algebra-1 Rocket into orbit.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              You have mastered:
              <br/>✓ Two-Step Equations
              <br/>✓ Distributive Property
              <br/>✓ Combining Like Terms
              <br/>✓ Variables on Both Sides
            </p>
            
            <div className="bg-green-500/20 text-green-300 py-3 px-6 rounded-lg font-bold border border-green-500/50 mb-8 inline-block">
              READY FOR EXAM LAUNCH
            </div>

            <button 
              onClick={handleRestart}
              className="w-full bg-white text-blue-900 font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start New Mission
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default App;
