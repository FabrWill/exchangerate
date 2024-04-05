export default class DebouncerHelper {
    static registerDebounce(callback, delay = 300) {
        let timer;
  
        return (...args) => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }
}