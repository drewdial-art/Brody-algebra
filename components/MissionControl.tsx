import React, { useState, useEffect } from 'react';
import { Question, StageType, Feedback } from '../types';
import { STAGE_CONFIG } from '../constants';
import { getTutoringHint } from '../services/geminiService';
import { BrainCircuit, ChevronRight, AlertTriangle, CheckCircle2, ClipboardList, Lightbulb } from 'lucide-react';

interface MissionControlProps {
  currentQuestion: Question;
  onCorrectAnswer: () => void;
  fuelLevel: number;
}

export const MissionControl: React.FC<MissionControlProps> = ({
  currentQuestion,
  onCorrectAnswer,
  fuelLevel
}) => {
  const [answer, setAnswer] = useState('');
  const [workLog, setWorkLog] = useState('');
  const [showWork, setShowWork] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentStageConfig = STAGE_CONFIG.find(c => c.id === currentQuestion.stage) || STAGE_CONFIG[0];

  useEffect(() => {
    setAnswer('');
    setWorkLog('');
    setShowWork(false);
    setRevealedSteps(0);
    setFeedback(null);
    setAttempts(0);
  }, [currentQuestion.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer) return;

    const numAnswer = parseFloat(answer);
    
    if (numAnswer === currentQuestion.correctAnswer) {
      setFeedback({
        type: 'success',
        message: 'Calculation verified! Fuel cells charging...'
      });
      setTimeout(() => {
        onCorrectAnswer();
      }, 1500);
    } else {
      setAttempts(prev => prev + 1);
      // If they miss it twice, auto-trigger AI help
      if (attempts >= 1) {
          handleGetAiHelp();
      } else {
           setFeedback({
            type: 'error',
            message: 'Incorrect calculation. Check your inverse operations.'
          });
      }
    }
  };

  const handleGetAiHelp = async () => {
    setIsAiThinking(true);
    setFeedback({ type: 'info', message: 'Contacting Flight Computer...' });
    
    const hint = await getTutoringHint(
      currentQuestion.equation, 
      answer || "?", 
      currentQuestion.correctAnswer
    );
    
    setFeedback({
      type: 'info',
      message: hint
    });
    setIsAiThinking(false);
  };

  const handleRevealStep = () => {
    if (revealedSteps < currentQuestion.steps.length) {
      setRevealedSteps(prev => prev + 1);
    }
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-6 shadow-2xl max-w-lg w-full flex flex-col gap-6">
      {/* Header / HUD */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${currentStageConfig.bg}`}>
            <currentStageConfig.icon className="text-white" size={24} />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${currentStageConfig.color}`}>
              {currentStageConfig.title}
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Mission Protocol Active</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-white">{fuelLevel}%</div>
          <div className="text-xs text-gray-500">FUEL STATUS</div>
        </div>
      </div>

      {/* Problem Display */}
      <div className="bg-black/40 rounded-xl p-8 text-center border border-gray-700 relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
         <p className="text-gray-400 text-sm mb-2 font-mono">{currentQuestion.prompt}</p>
         <h3 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-widest group-hover:text-blue-200 transition-colors">
            {currentQuestion.equation}
         </h3>
      </div>

      {/* Tools Section */}
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={() => setShowWork(!showWork)}
          className={`flex-1 py-2 px-3 rounded text-sm font-bold flex items-center justify-center gap-2 transition-colors ${showWork ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          <ClipboardList size={16} />
          {showWork ? 'Hide Mission Log' : 'Show Work'}
        </button>
        <button
          type="button"
          onClick={handleRevealStep}
          disabled={revealedSteps >= currentQuestion.steps.length}
          className={`flex-1 py-2 px-3 rounded text-sm font-bold flex items-center justify-center gap-2 transition-colors ${revealedSteps >= currentQuestion.steps.length ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500 text-white'}`}
        >
          <Lightbulb size={16} />
          Reveal Step ({revealedSteps}/{currentQuestion.steps.length})
        </button>
      </div>

      {/* Mission Log (Show Work) Area */}
      {showWork && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
           <label className="block text-xs font-mono text-gray-400 mb-1">MISSION LOG / SCRATCHPAD</label>
           <textarea
            value={workLog}
            onChange={(e) => setWorkLog(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-sm font-mono text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none min-h-[100px]"
            placeholder="Type your steps here..."
           />
        </div>
      )}

      {/* Tactical Data (Steps) Area */}
      {revealedSteps > 0 && (
        <div className="bg-gray-900/80 rounded-lg p-4 border border-yellow-500/30">
          <h4 className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Lightbulb size={12} /> Tactical Analysis
          </h4>
          <ul className="space-y-2">
            {currentQuestion.steps.slice(0, revealedSteps).map((step, idx) => (
              <li key={idx} className="text-sm font-mono text-gray-300 flex gap-2 animate-in fade-in slide-in-from-left-2">
                <span className="text-yellow-500/50">{idx + 1}.</span> {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter value..."
            className="w-full bg-gray-900 text-white text-2xl font-mono py-4 px-6 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-700"
            autoFocus
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-md font-bold transition-colors flex items-center gap-2"
          >
            ENGAGE <ChevronRight size={18} />
          </button>
        </div>
      </form>

      {/* Feedback Area */}
      <div className="min-h-[80px]">
        {feedback && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            feedback.type === 'success' ? 'bg-green-900/30 border-green-500/50 text-green-200' :
            feedback.type === 'error' ? 'bg-red-900/30 border-red-500/50 text-red-200' :
            'bg-blue-900/30 border-blue-500/50 text-blue-200'
          }`}>
            {feedback.type === 'success' && <CheckCircle2 className="shrink-0 mt-1" />}
            {feedback.type === 'error' && <AlertTriangle className="shrink-0 mt-1" />}
            {feedback.type === 'info' && <BrainCircuit className={`shrink-0 mt-1 ${isAiThinking ? 'animate-pulse' : ''}`} />}
            
            <div className="flex-1">
              <p className="font-mono text-sm leading-relaxed">{feedback.message}</p>
              
              {/* Manual AI Help Button if struggling */}
              {feedback.type === 'error' && attempts < 2 && !isAiThinking && (
                 <button 
                   onClick={handleGetAiHelp}
                   type="button"
                   className="mt-2 text-xs text-blue-300 hover:text-blue-100 underline decoration-blue-500/50 underline-offset-4"
                 >
                   Request Computer Analysis
                 </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
         <p className="text-xs text-gray-600 font-mono">
           MISSION TIP: {currentStageConfig.description}
         </p>
      </div>
    </div>
  );
};
