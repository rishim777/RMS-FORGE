/* eslint-disable @typescript-eslint/no-explicit-any */

/* debounce function credits to https://stackoverflow.com/a/59104590/17434048 */
export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Params) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
