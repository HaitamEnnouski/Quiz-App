import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, BookOpen } from "lucide-react";

export default function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch("http://localhost:5000/quizzes");
            
            if (!response.ok) {
                throw new Error("Failed to fetch quizzes");
            }
            
            const data = await response.json();
            setQuizzes(data);
        } catch (err) {
            setError("Could not load quizzes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleQuizStart = (quizId, quizTitle) => {
        navigate(`/quiz/${quizId}`, { state: { quizTitle } });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-center">
                    <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
                    <h2 className="text-xl font-bold uppercase">Loading Quizzes...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-center max-w-md">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h2 className="text-xl font-bold mb-4 uppercase">Error</h2>
                    <p className="mb-6">{error}</p>
                    <button
                        onClick={fetchQuizzes}
                        className="bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-gray-800 uppercase"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (quizzes.length === 0) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-center max-w-md">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                    <h2 className="text-xl font-bold mb-4 uppercase">No Quizzes Available</h2>
                    <p className="mb-6">Check back later for new quizzes!</p>
                    <button
                        onClick={fetchQuizzes}
                        className="bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-gray-800 uppercase"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black uppercase mb-4">Available Quizzes</h1>
                    <p className="text-lg font-bold">Choose a quiz and test your knowledge!</p>
                </div>

                {/* Quiz Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {quizzes.map((quiz, index) => (
                        <div
                            key={quiz.id}
                            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                        >
                            {/* Quiz Number */}
                            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-sm mb-4">
                                {index + 1}
                            </div>

                            {/* Quiz Info */}
                            <h2 className="text-xl font-bold uppercase mb-2">{quiz.title}</h2>
                            <p className="text-sm text-gray-700 mb-4">{quiz.description}</p>

                            {/* Category and Question Count */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {quiz.category && (
                                    <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1 border-2 border-black uppercase">
                                        {quiz.category}
                                    </span>
                                )}
                                {quiz.questions && (
                                    <span className="bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 border-2 border-black uppercase">
                                        {quiz.questions.length} Questions
                                    </span>
                                )}
                            </div>

                            {/* Start Button */}
                            <button
                                onClick={() => handleQuizStart(quiz.id, quiz.title)}
                                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 border-2 border-black uppercase mt-4"
                            >
                                Start Quiz
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}