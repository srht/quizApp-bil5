import React from "react";

// Soru ilerleme çubuğunu gösteren bileşen
function BarQuestions({ questions, currentQuestionIndex, answerHistory }) {
  return (
    <div className="flex gap-2">
      {/* Her soru için bir kutu oluştur */}
      {questions.map((_, index) => (
        <span
          key={index}
          className={`w-7 h-7 rounded ${
            // Önceki sorular için yeşil (doğru) veya kırmızı (yanlış) göster
            index < currentQuestionIndex
              ? answerHistory[index] === true
                ? "bg-green-400" // Doğru cevap
                : "bg-red-400"   // Yanlış cevap
              : index === currentQuestionIndex
              ? "bg-yellow-400"  // Aktif soru
              : "bg-gray-200"    // Henüz cevaplanmamış sorular
          } block`}
        ></span>
      ))}
    </div>
  );
}

export default BarQuestions;
