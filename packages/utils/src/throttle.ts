/* eslint-disable */

/* throttle function credits to https://stackoverflow.com/questions/27078285/simple-throttle-in-js */
export const throttle = (func: any, wait: any, options?: any) => {
  let context: any, args: any, result: any;
  let timeout: any = null;
  let previous = 0;

  if (!options) options = {};

  const later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function () {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    // @ts-ignore-next-line
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
