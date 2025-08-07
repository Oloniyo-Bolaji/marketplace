export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = date.toLocaleDateString("en-GB");
  return day;
};

export const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};

export const getTime = (isoDate) => {
  const now = new Date();
  const target = new Date(isoDate);
  const diff = target - now;

  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

export const formatSingleTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};
