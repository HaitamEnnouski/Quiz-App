
import { useState } from "react"
import { useQuiz } from "../context/QuizContext"
import QuizCard from "../components/QuizCard"

const QuizList = ({ onNavigate }) => {
  const { quizData, startQuiz } = useQuiz()
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const handleStartQuiz = (languageData, difficulty, quiz) => {
    // Find the language key from the quizData
    const languageKey = Object.keys(quizData).find((key) => quizData[key] === languageData)
    startQuiz(languageKey, difficulty)
    onNavigate("quiz")
  }

  const getFilteredQuizzes = () => {
    const quizzes = []

    Object.entries(quizData).forEach(([langKey, langData]) => {
      if (selectedLanguage === "all" || selectedLanguage === langKey) {
        Object.entries(langData.quizzes).forEach(([diffKey, quiz]) => {
          if (selectedDifficulty === "all" || selectedDifficulty === diffKey) {
            quizzes.push({
              languageKey: langKey,
              languageData: langData,
              difficulty: diffKey,
              quiz: quiz,
            })
          }
        })
      }
    })

    return quizzes
  }

  const filteredQuizzes = getFilteredQuizzes()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate("landing")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Choose Your Quiz</h1>
                <p className="text-muted-foreground">Select a programming language and difficulty level</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Language Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Programming Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Languages</option>
                {Object.entries(quizData).map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.icon} {data.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Difficulty Level</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(({ languageKey, languageData, difficulty, quiz }) => (
            <QuizCard
              key={`${languageKey}-${difficulty}`}
              language={languageData}
              difficulty={difficulty}
              quiz={quiz}
              onStart={handleStartQuiz}
            />
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No quizzes found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more quiz options.</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{Object.keys(quizData).length}</div>
            <div className="text-muted-foreground">Programming Languages</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              {Object.values(quizData).reduce((total, lang) => total + Object.keys(lang.quizzes).length, 0)}
            </div>
            <div className="text-muted-foreground">Total Quizzes</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {Object.values(quizData).reduce(
                (total, lang) =>
                  total + Object.values(lang.quizzes).reduce((langTotal, quiz) => langTotal + quiz.questions.length, 0),
                0,
              )}
            </div>
            <div className="text-muted-foreground">Total Questions</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuizList
