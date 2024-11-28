// game start time storage
export const gameStartTime = () => {
  let startTime = localStorage.getItem("gameStartTime");
  if (!startTime) {
    startTime = new Date().getTime();
    localStorage.setItem("gameStartTime", startTime);
  }
  return startTime;
}