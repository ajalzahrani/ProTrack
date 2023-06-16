const convertTimeToSeconds = (min: number, sec: number) => {
  return min * 60 + sec;
};

const convertToTimeObj = (number = 0) => {
  let timeObj = {hours: 0, minutes: 0, seconds: 0};

  timeObj.minutes = Math.floor(number / 60);
  timeObj.seconds = number % 60;

  return timeObj;
};

const secondsToTimeObject = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {hours, minutes, seconds};
};

export const timing = {
  convertTimeToSeconds,
  convertToTimeObj,
  secondsToTimeObject,
};
