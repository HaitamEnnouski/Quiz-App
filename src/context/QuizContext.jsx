import { createContext, useContext, useState } from "react";

// create context
const QuizContext = createContext();

// fake quiz data (later you could import from db.json)
const quizzes = [
  {
    id: "easy-js",
    title: "JavaScript Basics",
    level: "Easy",
    timeLimit: 300, // seconds
    description: "Core JS concepts for beginners."
  },
  {
    id: "medium-html",
    title: "HTML Fundamentals",
    level: "Medium",
    timeLimit: 600,
    description: "Semantic HTML and structure."
  },
  {
    id: "hard-css",
    title: "CSS Essentials",
    level: "Hard",
    timeLimit: 900,
    description: "Selectors, layout, cascade and advanced CSS."
  }
];

export function QuizProvider({ children }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const startQuiz = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    setSelectedQuiz(quiz || null);
  };

  return (
    <QuizContext.Provider value={{ quizzes, selectedQuiz, startQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
