import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import QuizList from "./pages/QuizList.jsx";
import Quiz from "./pages/Quiz.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}
