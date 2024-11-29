import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  setSelectedAnswer,
  nextQuestion,
  initializeFromLocalStorage,
} from "../store/quizSlice";
import BarQuestions from "../components/BarQuestions";
import CountUp from "../components/CountUp";
import ResultModal from "../components/ResultModal";
function Quiz() {
  const dispatch = useDispatch();
  const { currentQuestionIndex, selectedAnswer, questions, answerHistory } =
    useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, [dispatch]);

  const handleAnswerClick = (option) => {
    dispatch(setSelectedAnswer(option));
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleNextQuestion = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(nextQuestion());
  };

  // Son soruyu göstermek için index kontrolü
  const displayQuestionIndex = Math.min(
    currentQuestionIndex,
    questions.length - 1
  );
  const currentQuestion = questions?.[displayQuestionIndex];
  let _targetWord = currentQuestion.target_word;
  let qsParts = [];
  let newQuestion = {
    firstPart: "",
    wordPart: "",
    lastPart: "",
  };
  if (_targetWord) {
    qsParts = currentQuestion.question.split(_targetWord);
    newQuestion.firstPart = qsParts[0];
    newQuestion.wordPart = _targetWord;
    newQuestion.lastPart = qsParts[1];
  } else {
    qsParts = currentQuestion.question.split(" ");
    _targetWord = qsParts[qsParts.length - 1];
    let questionSentence = "";
    for (let index = 0; index < qsParts.length - 1; index++) {
      const word = qsParts[index];
      questionSentence += word + " ";
    }

    newQuestion.firstPart = questionSentence;
    newQuestion.wordPart = _targetWord;
  }

  // Eğer sorular yüklenmediyse loading göster
  if (!questions?.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full h-auto md:h-full flex-col">
      {/* Logo */}
      <motion.div
        className="w-full text-center relative md:absolute top-0 md:top-8 mb-5 mt-2 md:mt-0 md:mb-0"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <h1 className="text-2xl font-black tracking-tight">
          lang<span className="text-emerald-500">5</span>
        </h1>
      </motion.div>

      <div className="container bg-white p-5 border-b flex gap-5 items-center justify-between flex-col md:flex-row">
        <BarQuestions
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answerHistory={answerHistory}
        />
        <CountUp />
      </div>

      {/* Soru ve Şıklar */}
      <AnimatePresence mode="wait">
        <div
          key={displayQuestionIndex}
          className="container min-h-auto pb-6 md:pb-0 md:min-h-[500px] bg-white mx-auto"
        >
          {/* Soru metni */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="min-h-[120px] border-b flex items-center justify-center p-5"
          >
            <h4 className="font-poppins font-semibold text-xl max-w-[700px] text-center">
              {newQuestion.firstPart}
              <span style={{ fontWeight: "900" }}>{newQuestion.wordPart}</span>
              {newQuestion.lastPart}
            </h4>
          </motion.div>

          {/* Cevap şıkları */}
          <div className="grid grid-cols-1 md:grid-cols-2 py-7 gap-3 md:gap-7 px-7 md:px-20">
            {currentQuestion?.options.map((option, index) => (
              <motion.button
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.1 }}
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={currentQuestionIndex >= questions.length}
                className={`group outline-none p-7 border rounded text-left font-poppins font-semibold text-xl ${
                  selectedAnswer === option
                    ? "text-emerald-600 border-emerald-500 bg-emerald-50"
                    : "text-gray-800"
                } focus:text-emerald-600 focus:border-emerald-500 focus:bg-emerald-50`}
              >
                <span
                  className={`px-3 py-1 mr-2 rounded font-poppins font-bold ${
                    selectedAnswer === option
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white"
                      : "bg-emerald-50 text-gray-800"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>{" "}
                {option}
              </motion.button>
            ))}
          </div>

          {/* Sonraki soru butonu */}
          <div className="flex justify-end px-7 md:px-20">
            <button
              onClick={handleNextQuestion}
              className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white border group-hover:border-emerald-500"
            >
              <div className="absolute inset-0 w-3 bg-emerald-50 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-emerald-500 font-poppins">
                {currentQuestionIndex < questions.length - 1
                  ? "Sonraki Soru"
                  : "Sonucu Göster"}
              </span>
            </button>
          </div>
        </div>
      </AnimatePresence>

      {/* Sonuç Modalı */}
      {currentQuestionIndex >= questions.length && <ResultModal />}
    </div>
  );
}

export default Quiz;
