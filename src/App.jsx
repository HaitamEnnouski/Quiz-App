import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import QuizList from "./pages/QuizList";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quizzes" element={<QuizList />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
