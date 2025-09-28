import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

export default function QuizList() {
  const { quizzes, startQuiz } = useQuiz();
  const navigate = useNavigate();

  const handleStart = (id) => {
    startQuiz(id);
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Quizzes</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="border rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition bg-white dark:bg-gray-900"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {quiz.description}
              </p>
              <span className="inline-block text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded mr-2">
                {quiz.level}
              </span>
              <span className="inline-block text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                {quiz.timeLimit / 60} min
              </span>
            </div>
            <button
              onClick={() => handleStart(quiz.id)}
              className="mt-4 bg-black dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700"
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
