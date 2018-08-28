/**
 * 系统外部依赖接口，h5实现
 */

export default {
  setTitle: opts => {
    document.title = opts.title;
    const i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(() => {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  },
  openWindow: url => {
    window.location.href = url;
  },
};
