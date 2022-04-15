let timer: NodeJS.Timeout;

export const debounce = (func: Function, timeout = 300) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => func(), timeout);
};
