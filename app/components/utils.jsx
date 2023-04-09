export const formatTime = (time) => {
  const hours = Math.floor(time / 36000);
  const minutes = Math.floor((time % 36000) / 600);
  const seconds = Math.floor((time % 600) / 10);
  const centiseconds = time % 10;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds}`;
};
