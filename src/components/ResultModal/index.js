import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function ResultModal() {
  const { answerHistory } = useSelector((state) => state.quiz);
  const score = answerHistory.filter(answer => answer === true).length;

  // Local Storage'ı temizle
  const removeLocalStorage = () => {
    localStorage.removeItem("answerHistory");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("gameStartTime");
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="bg-white rounded-2xl p-8 md:p-12 w-[90%] max-w-lg mx-auto relative"
      >
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">İstatistikler</h2>
        </div>

        {/* Skor Kartı */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-1">{score}</div>
            <div className="text-sm text-gray-500">Skor</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {Math.round((score / 5) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Başarı</div>
          </div>
        </div>

        {/* Emoji Sonuçları */}
        <div className="bg-gray-100 p-4 rounded-xl mb-8 text-center">
          <div className="text-2xl mb-2 tracking-widest font-mono">
            {answerHistory.map((answer, index) => (
              <span key={index} className="inline-block mx-1">
                {answer ? "🟩" : "🟥"}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            bil5app
          </div>
        </div>

        {/* Butonlar */}
        <div className="space-y-3">
          <button
            onClick={removeLocalStorage}
            className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ResultModal; 