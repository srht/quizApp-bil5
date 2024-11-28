import React, { useState, useEffect, useMemo, memo } from "react";
import { gameStartTime } from "../../Funcions/StorageManagement";

// Yeniden kullanılabilir Timer bileşeni
const TimerDisplay = memo(({ value, label }) => (
  <div className="timer">
    <div className="rounded-xl border border-[#22a247] py-1.5 min-w-[60px] flex items-center justify-center flex-col gap-0 aspect-square px-1.5">
      <h3 className="countdown-element font-manrope font-semibold text-xl text-[#22a247] text-center">
        {String(value).padStart(2, "0")}
      </h3>
      <p className="text-xs font-inter capitalize font-normal text-[#22a247] text-center w-full">
        {label}
      </p>
    </div>
  </div>
));

const CountUp = () => {
  const [time, setTime] = useState(0);
  const [error, setError] = useState(null);

  // currentQuestionIndex
  let currentQuestionIndex = localStorage.getItem("currentQuestionIndex");

  useEffect(() => {
    try {
      const startTime = gameStartTime();
      if (startTime) {
        const timeDifference = Math.floor((Date.now() - startTime) / 1000);
        setTime(timeDifference);
        console.log("timeDifference:", timeDifference);
        console.log("currentQuestionIndex:", currentQuestionIndex);

        // Eğer 30 dakikadan fazla süre geçtiyse ve currentQuestionIndex null ise süreyi sıfırlar
        if(timeDifference > 1800 && currentQuestionIndex === null){
          setTime(0);
          const startTime = new Date().getTime();
          localStorage.setItem("gameStartTime", startTime);
        }
      }

      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    } catch (error) {
      console.error("Sayaç başlatılırken hata oluştu:", error);
      setError("Sayaç başlatılırken bir hata oluştu");
    }
  }, [currentQuestionIndex]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  };

  const { minutes, seconds } = useMemo(() => formatTime(time), [time]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <TimerDisplay value={minutes} label="Dakika" />
      <h3 className="font-manrope font-semibold text-xl text-gray-900">:</h3>
      <TimerDisplay value={seconds} label="Saniye" />
    </div>
  );
};

export default CountUp;
