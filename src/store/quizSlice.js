import { createSlice } from '@reduxjs/toolkit';
import questionsData from "../questions.json";

function getRandomQuestions(questionsData, count) {
  const shuffled = questionsData.sort(() => Math.random() - 0.5); // Soruları karıştır
  return shuffled.slice(0, count); // İlk 'count' kadarını al
}

const initialState = {
  currentQuestionIndex: 0,
  selectedAnswer: "",
  score: 0,
  questions: getRandomQuestions(questionsData, 5), // Rastgele 5 soru seçer
  answerHistory: new Array(5).fill(null), // Cevap geçmişi için 5 elemanlı dizi oluşturur
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setSelectedAnswer: (state, action) => {
      state.selectedAnswer = action.payload;
    },
    nextQuestion: (state) => {
      if (state.selectedAnswer === state.questions[state.currentQuestionIndex].answer) {
        state.score += 1;
        state.answerHistory[state.currentQuestionIndex] = true;
      } else {
        state.answerHistory[state.currentQuestionIndex] = false;
      }
      state.currentQuestionIndex += 1;
      state.selectedAnswer = "";
      
      // LocalStorage işlemleri
      localStorage.setItem("currentQuestionIndex", state.currentQuestionIndex);
      localStorage.setItem("answerHistory", JSON.stringify(state.answerHistory));
    },
    initializeFromLocalStorage: (state) => {
      const savedIndex = localStorage.getItem("currentQuestionIndex");
      const savedHistory = localStorage.getItem("answerHistory");
      
      if (savedIndex) {
        state.currentQuestionIndex = parseInt(savedIndex);
      }
      if (savedHistory) {
        state.answerHistory = JSON.parse(savedHistory);
      }
    }
  }
});

export const { setSelectedAnswer, nextQuestion, initializeFromLocalStorage } = quizSlice.actions;
export default quizSlice.reducer; 