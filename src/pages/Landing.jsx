import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    const categories = [
        { name: "Technology", color: "bg-blue-500" },
        { name: "Trivia", color: "bg-green-500" },
        { name: "Sports", color: "bg-red-500" },
        { name: "Education", color: "bg-purple-500" }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
                Welcome to Quiz Master 🎉
            </h1>
            <p className="text-gray-600 mb-10 text-center max-w-lg">
                Choose a category and test your knowledge with fun quizzes!
            </p>

            {/* Category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/quizzes?category=${cat.name}`)}
                        className={`${cat.color} text-white rounded-2xl shadow-md p-6 cursor-pointer 
                        flex items-center justify-center text-xl font-semibold 
                        transition transform hover:scale-105 hover:shadow-lg`}
                    >
                        {cat.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
