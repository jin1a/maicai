// utils/debounce.js
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer); // 清除之前的定时器
        timer = setTimeout(() => {
            fn.apply(this, args); // 执行函数
        }, delay);
    };
}
module.exports = debounce;
