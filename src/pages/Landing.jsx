import { Link } from "react-router-dom";

export default function Landing() {

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-6 py-4 shadow-sm">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-black text-white text-lg">
                        &lt;/&gt;
                    </div>
                    <span className="text-xl font-bold">CodeQuiz</span>
                </div>

                {/* Links */}


                {/* Get Started button */}
                <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800">
                    Get Started
                </button>
            </nav>

            {/* HERO SECTION */}
            <section className="flex flex-col items-center justify-center text-center px-4 py-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 max-w-3xl leading-tight">
                    Master Programming Languages <br className="hidden md:block" /> with Interactive Quizzes
                </h1>

                <p className="text-gray-600 max-w-2xl mb-10 text-lg">
                    Test your knowledge across multiple programming languages with our comprehensive quiz platform.
                    Choose your difficulty level and track your progress as you become a coding expert.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link
                        to="/quizzes"
                        className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 font-semibold text-lg"
                    >
                        Start Quiz
                    </Link>

                    <Link
                        to="/quizzes"
                        className="border border-black text-black px-8 py-3 rounded-xl hover:bg-gray-100 font-semibold text-lg"
                    >
                        View Leaderboard
                    </Link>
                </div>

                {/* Terminal-like box */}
                <div className="bg-white border rounded-xl px-6 py-4 flex items-center gap-2 text-gray-700 font-mono shadow">
                    <div className="flex gap-1">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <span className="ml-3">$ npm start quiz-challenge</span>
                </div>
            </section>
            {/* ===== FEATURES SECTION ===== */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Everything you need to level up your coding skills
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                        Our platform offers comprehensive quizzes designed to challenge and improve your programming knowledge.
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Card 1 */}
                        <div className="rounded-xl border p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-black text-white mb-4 text-2xl">
                                📊
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Multiple Difficulty Levels</h3>
                            <p className="text-gray-600 text-sm">
                                Choose from Easy, Medium, or Hard difficulty levels to match your current skill level and progressively challenge yourself.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-xl border p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-black text-white mb-4 text-2xl">
                                ⏱️
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Timed Challenges</h3>
                            <p className="text-gray-600 text-sm">
                                Test your knowledge under pressure with customizable time limits that simulate real coding interview conditions.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="rounded-xl border p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-black text-white mb-4 text-2xl">
                                🚀
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
                            <p className="text-gray-600 text-sm">
                                Master JavaScript, Python, Java, C++, and more with language-specific quizzes covering syntax, concepts, and best practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ===== CALL TO ACTION ===== */}
            <section className="bg-white py-20">
                <div className="max-w-4xl mx-auto text-center border rounded-2xl px-6 py-14 shadow-sm">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Ready to test your skills?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Join thousands of developers who are improving their coding skills with our interactive quiz platform.
                    </p>
                    <a
                        href="#quizzes"
                        className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 font-semibold text-lg inline-block"
                    >
                        Start Your First Quiz
                    </a>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-white border-t py-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-black text-white text-lg">
                            &lt;/&gt;
                        </div>
                        <span className="font-bold text-lg">CodeQuiz</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © 2025 CodeQuiz. Built for developers, by Arkidian.
                    </p>
                </div>
            </footer>


        </div>
    );
}