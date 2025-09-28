import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2, AlertCircle, ArrowLeft, ArrowRight, Check, BookOpen, RotateCcw, Zap } from "lucide-react";

// Custom RadioGroup component
const RadioGroup = ({ value, onValueChange, className, children, onKeyPress }) => {
    return (
        <div 
            className={className} 
            role="radiogroup"
            onKeyDown={onKeyPress}
        >
            {children}
        </div>
    );
};

// Custom RadioGroupItem component
const RadioGroupItem = ({ value, id, className, checked, onChange }) => {
    return (
        <input
            type="radio"
            id={id}
            value={value}
            checked={checked}
            onChange={onChange}
            className={`sr-only ${className}`}
        />
    );
};

// Custom Label component
const Label = ({ htmlFor, className, children, ...props }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={className}
            {...props}
        >
            {children}
        </label>
    );
};

export default function Quiz() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch quiz data
    useEffect(() => {
        const loadQuiz = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`http://localhost:5000/quizzes/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to load quiz: ${response.status}`);
                }

                const data = await response.json();

                if (!data.questions || data.questions.length === 0) {
                    throw new Error("Quiz has no questions");
                }

                setQuiz(data);
            } catch (err) {
                console.error("Error loading quiz:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadQuiz();
        }
    }, [id]);

    // Handle answer selection
    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = async () => {
        if (!selectedAnswer.trim()) return;

        const currentAnswer = {
            question: currentQuestion.question,
            picked: selectedAnswer,
            correct: currentQuestion.answer,
            isCorrect: selectedAnswer === currentQuestion.answer
        };

        const newAnswers = [...answers, currentAnswer];
        setAnswers(newAnswers);

        // If there are more questions, go to next question
        if (currentQuestionIndex + 1 < questions.length) {
            // Move to next question
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer("");
        } else {
            // Quiz completed - navigate to results
            setIsSubmitting(true);
            try {
                navigate("/results", {
                    state: {
                        quiz,
                        answers: newAnswers,
                        score: newAnswers.filter(a => a.isCorrect).length,
                        totalQuestions: questions.length
                    }
                });
            } catch (err) {
                console.error("Error navigating to results:", err);
                setIsSubmitting(false);
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            if (answers[currentQuestionIndex - 1]) {
                setSelectedAnswer(answers[currentQuestionIndex - 1].picked);
            } else {
                setSelectedAnswer("");
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && selectedAnswer.trim()) {
            handleNext();
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000] p-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center animate-pulse">
                            <Loader2 className="h-10 w-10 text-white animate-spin" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black uppercase tracking-tight">LOADING QUIZ</h2>
                            <p className="text-base font-bold">
                                Please wait while we prepare your quiz...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
                <div className="w-full max-w-xl bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000]">
                    <div className="bg-black border-b-8 border-black p-6 text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center transform rotate-12">
                                <AlertCircle className="h-8 w-8 text-black" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                            ERROR LOADING QUIZ
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_#000] p-4">
                            <p className="font-bold text-lg text-black">{error}</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-white hover:bg-gray-100 text-black font-black py-4 px-8 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider flex items-center space-x-2"
                            >
                                <RotateCcw className="h-5 w-5" />
                                <span>TRY AGAIN</span>
                            </button>
                            <button
                                onClick={() => navigate("/quizzes")}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-black py-4 px-8 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider flex items-center space-x-2"
                            >
                                <BookOpen className="h-5 w-5" />
                                <span>BACK TO QUIZZES</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const questions = quiz.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestionIndex + 1 === questions.length;

    return (
        <div className="min-h-screen bg-gray-200  py-4 flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto px-4">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                    <div className="bg-gray-600 border-b-4 border-black p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="bg-white border-2 border-black shadow-[1px_1px_0px_0px_#000] px-2 py-1 transform -rotate-1">
                                <Link to={"/quizzes"} className="flex text-xs font-black uppercase tracking-wide">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to quizzes</Link>
                            </div>
                            <div className="bg-black text-white border-2 border-black shadow-[1px_1px_0px_0px_#333] px-2 py-1 transform rotate-1">
                                <span className="text-xs font-black uppercase tracking-wide">
                                    QUESTION {currentQuestionIndex + 1} OF {questions.length}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight text-center mb-4">
                            {quiz.title}
                        </h1>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-black uppercase tracking-wide text-white">PROGRESS</span>
                                <span className="text-sm font-black bg-white text-black px-2 py-0.5 border-2 border-black shadow-[1px_1px_0px_0px_#000]">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-300 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                                <div
                                    className="h-4 bg-black border-r-2 border-black transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Question */}
                        <div className="bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_#000] p-4 transform -rotate-1">
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center font-black text-sm">
                                    {currentQuestionIndex + 1}
                                </div>
                                <Zap className="h-6 w-6 text-black" />
                            </div>
                            <h2 className="text-lg font-black leading-snug text-black">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                            <h3 className="text-base font-black uppercase tracking-wide mb-2">CHOOSE YOUR ANSWER:</h3>
                            <RadioGroup
                                value={selectedAnswer}
                                onValueChange={handleAnswerSelect}
                                className="space-y-2"
                                onKeyPress={handleKeyPress}
                            >
                                {currentQuestion.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`border-4 border-black shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer transform hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] ${selectedAnswer === option
                                            ? 'bg-gray-600 text-white'
                                            : 'bg-white hover:bg-gray-100'
                                            }`}
                                        onClick={() => handleAnswerSelect(option)}
                                    >
                                        <div className="flex items-center space-x-3 p-4">
                                            <div className={`w-6 h-6 border-2 border-black flex items-center justify-center font-black text-sm ${selectedAnswer === option ? 'bg-white text-black' : 'bg-black text-white'
                                                }`}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <RadioGroupItem
                                                value={option}
                                                id={`option-${index}`}
                                                className="w-4 h-4 border-2 border-black"
                                                checked={selectedAnswer === option}
                                                onChange={() => handleAnswerSelect(option)}
                                            />
                                            <Label
                                                htmlFor={`option-${index}`}
                                                className={`flex-1 cursor-pointer font-bold text-sm ${selectedAnswer === option ? 'text-white' : 'text-black'
                                                    }`}
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-4 border-t-4 border-black">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className={`font-black py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider flex items-center space-x-1 transition-all text-xs sm:text-sm ${currentQuestionIndex === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-white hover:bg-gray-100 text-black hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]'
                                    }`}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">PREVIOUS</span>
                            </button>

                            <div className="text-center space-y-1">
                                <div className="bg-black text-white px-2 py-1 border-2 border-black shadow-[1px_1px_0px_0px_#333] font-black text-xs uppercase tracking-wide">
                                    {selectedAnswer ? "READY!" : "SELECT AN ANSWER"}
                                </div>
                                {selectedAnswer && (
                                    <div className="text-xs font-bold text-gray-700">
                                        Press Enter or Next
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!selectedAnswer.trim() || isSubmitting}
                                className={`font-black py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider flex items-center space-x-1 transition-all min-w-[120px] justify-center text-xs sm:text-sm ${!selectedAnswer.trim() || isSubmitting
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gray-600 hover:bg-gray-700 text-white hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="hidden sm:inline">SUBMITTING...</span>
                                    </>
                                ) : isLastQuestion ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        <span className="hidden sm:inline">FINISH QUIZ</span>
                                    </>
                                ) : (
                                    <>
                                        <ArrowRight className="h-4 w-4" />
                                        <span className="hidden sm:inline">NEXT QUESTION</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}