import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
    Trophy, 
    RotateCcw, 
    BookOpen, 
    Eye, 
    EyeOff,
    CheckCircle2,
    XCircle,
    Target,
    AlertTriangle,
    Star,
    ThumbsUp,
    GraduationCap,
    Zap
} from "lucide-react";

export default function Results() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showDetailedAnswers, setShowDetailedAnswers] = useState(true);

    if (!state) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-200  p-4">
                <div className="w-full max-w-md bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000] p-8">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center transform rotate-12">
                            <AlertTriangle className="h-10 w-10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black uppercase tracking-tight">NO RESULTS FOUND</h2>
                            <p className="text-base font-semibold">
                                Please take a quiz first to see your results.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/quizzes")}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-black py-4 px-8 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider"
                        >
                            BROWSE QUIZZES
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const { quiz, answers, score, totalQuestions } = state;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    const getScoreMessage = (percentage) => {
        if (percentage === 100) return "PERFECT SCORE!";
        if (percentage >= 80) return "EXCELLENT WORK!";
        if (percentage >= 60) return "GOOD JOB!";
        if (percentage >= 40) return "KEEP PRACTICING!";
        return "TRY AGAIN!";
    };

    const getMessageIcon = (percentage) => {
        if (percentage === 100) return <Trophy className="h-6 w-6" />;
        if (percentage >= 80) return <Star className="h-6 w-6" />;
        if (percentage >= 60) return <ThumbsUp className="h-6 w-6" />;
        if (percentage >= 40) return <GraduationCap className="h-6 w-6" />;
        return <Zap className="h-6 w-6" />;
    };

    const handleRetakeQuiz = () => {
        navigate(`/quiz/${quiz.id}`, { replace: true });
    };

    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const incorrectAnswers = answers.filter(a => !a.isCorrect).length;

    return (
        <div className="min-h-screen bg-gray-200 py-8">
            <div className="max-w-4xl mx-auto px-4 space-y-8">
                {/* Main Score Card */}
                <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000]">
                    <div className="bg-black border-b-8 border-black p-6 text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <Trophy className="h-8 w-8 text-white" />
                            <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                                QUIZ COMPLETE!
                            </h1>
                        </div>
                        <h2 className="text-xl font-bold text-white bg-gray-600 px-4 py-2 inline-block transform -rotate-1">
                            {quiz.title}
                        </h2>
                    </div>
                    
                    <div className="p-8 space-y-8">
                        {/* Score Display */}
                        <div className="text-center space-y-6">
                            <div className="relative inline-block">
                                <div className="w-40 h-40 bg-gray-300 border-8 border-black shadow-[8px_8px_0px_0px_#000] flex items-center justify-center transform rotate-3">
                                    <span className="text-5xl font-black text-black transform -rotate-3">
                                        {percentage}%
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-black text-white px-6 py-3 inline-block border-4 border-black shadow-[4px_4px_0px_0px_#333]">
                                    <span className="text-xl font-black">
                                        {score} OUT OF {totalQuestions} CORRECT
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-center space-x-3">
                                    {getMessageIcon(percentage)}
                                    <span className="text-2xl font-black uppercase tracking-wide">
                                        {getScoreMessage(percentage)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-6">
                            <button
                                onClick={handleRetakeQuiz}
                                className="bg-white hover:bg-gray-100 text-black font-black py-4 px-8 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider flex items-center space-x-2"
                            >
                                <RotateCcw className="h-5 w-5" />
                                <span>RETAKE QUIZ</span>
                            </button>
                            <button
                                onClick={() => navigate("/quizzes")}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-black py-4 px-8 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider flex items-center space-x-2"
                            >
                                <BookOpen className="h-5 w-5" />
                                <span>MORE QUIZZES</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detailed Results Card */}
                <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000]">
                    <div className="bg-gray-600 border-b-8 border-black p-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                                DETAILED RESULTS
                            </h3>
                            <button
                                onClick={() => setShowDetailedAnswers(!showDetailedAnswers)}
                                className="bg-white hover:bg-gray-100 text-black font-black py-3 px-6 border-4 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transform hover:translate-x-[1px] hover:translate-y-[1px] transition-all uppercase tracking-wide text-sm flex items-center space-x-2"
                            >
                                {showDetailedAnswers ? (
                                    <>
                                        <EyeOff className="h-4 w-4" />
                                        <span>HIDE</span>
                                    </>
                                ) : (
                                    <>
                                        <Eye className="h-4 w-4" />
                                        <span>SHOW</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-8 space-y-8">
                        {/* Statistics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-400 border-6 border-black shadow-[6px_6px_0px_0px_#000] p-6 text-center transform -rotate-1">
                                <div className="flex items-center justify-center space-x-3 mb-3">
                                    <CheckCircle2 className="h-8 w-8 text-black" />
                                    <span className="text-4xl font-black text-black">
                                        {correctAnswers}
                                    </span>
                                </div>
                                <div className="text-sm font-black text-black uppercase tracking-wide">
                                    CORRECT ANSWERS
                                </div>
                            </div>
                            
                            <div className="bg-red-400 border-6 border-black shadow-[6px_6px_0px_0px_#000] p-6 text-center">
                                <div className="flex items-center justify-center space-x-3 mb-3">
                                    <XCircle className="h-8 w-8 text-black" />
                                    <span className="text-4xl font-black text-black">
                                        {incorrectAnswers}
                                    </span>
                                </div>
                                <div className="text-sm font-black text-black uppercase tracking-wide">
                                    INCORRECT ANSWERS
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black uppercase">OVERALL PERFORMANCE</span>
                                <span className="text-lg font-black bg-black text-white px-3 py-1 border-2 border-black">
                                    {percentage}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-300 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                                <div 
                                    className="h-8 bg-black border-r-4 border-black transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Question Breakdown */}
                        {showDetailedAnswers && (
                            <div className="space-y-6">
                                <div className="bg-black text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#333] transform -rotate-1">
                                    <h4 className="font-black text-xl uppercase tracking-wide">
                                        QUESTION BREAKDOWN
                                    </h4>
                                </div>
                                <div className="space-y-4">
                                    {answers.map((answer, index) => (
                                        <div
                                            key={index}
                                            className={`border-6 border-black shadow-[6px_6px_0px_0px_#000] p-6 ${
                                                answer.isCorrect ? "bg-green-100" : "bg-red-100"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <h5 className="font-bold text-lg flex-1 pr-4 leading-tight">
                                                    {index + 1}. {answer.question}
                                                </h5>
                                                <div className={`px-4 py-2 border-4 border-black shadow-[2px_2px_0px_0px_#000] font-black text-sm uppercase tracking-wide flex items-center space-x-2 ${
                                                    answer.isCorrect ? "bg-green-400 text-black" : "bg-red-400 text-black"
                                                }`}>
                                                    {answer.isCorrect ? (
                                                        <>
                                                            <CheckCircle2 className="h-4 w-4" />
                                                            <span>CORRECT</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="h-4 w-4" />
                                                            <span>WRONG</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-black uppercase tracking-wide min-w-[120px]">
                                                        YOUR ANSWER:
                                                    </span>
                                                    <div className={`px-3 py-2 border-3 border-black font-bold ${
                                                        answer.isCorrect ? "bg-green-300" : "bg-red-300"
                                                    }`}>
                                                        {answer.picked}
                                                    </div>
                                                </div>
                                                {!answer.isCorrect && (
                                                    <div className="flex items-center space-x-3">
                                                        <span className="font-black uppercase tracking-wide min-w-[120px]">
                                                            CORRECT:
                                                        </span>
                                                        <div className="px-3 py-2 border-3 border-black bg-green-300 font-bold">
                                                            {answer.correct}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}