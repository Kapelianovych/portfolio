import type Typed from './typed';

export function getCurrentElContent(self: Typed): string {
  let elContent = '';
  if (self.attr) {
    elContent = self.el.getAttribute(self.attr) || '';
  } else if (self.isInput) {
    // @ts-ignore
    elContent = self.el.value;
  } else if (self.contentType === 'html') {
    elContent = self.el.innerHTML;
  } else {
    elContent = self.el.textContent || '';
  }
  return elContent;
}

export function appendAnimationCss(self: Typed): void {
  const cssDataName = 'data-typed-js-css';
  if (!self.autoInsertCss) {
    return;
  }
  if (!self.showCursor && !self.fadeOut) {
    return;
  }
  if (document.querySelector(`[${cssDataName}]`)) {
    return;
  }

  let css = document.createElement('style');
  css.type = 'text/css';
  css.setAttribute(cssDataName, 'true');

  let innerCss = '';
  if (self.showCursor) {
    innerCss += `
      .typed-cursor{
        opacity: 1;
      }
      .typed-cursor.typed-cursor--blink{
        animation: typedjsBlink 0.7s infinite;
        -webkit-animation: typedjsBlink 0.7s infinite;
                animation: typedjsBlink 0.7s infinite;
      }
      @keyframes typedjsBlink{
        50% { opacity: 0.0; }
      }
      @-webkit-keyframes typedjsBlink{
        0% { opacity: 1; }
        50% { opacity: 0.0; }
        100% { opacity: 1; }
      }
    `;
  }
  if (self.fadeOut) {
    innerCss += `
      .typed-fade-out{
        opacity: 0;
        transition: opacity .25s;
      }
      .typed-cursor.typed-cursor--blink.typed-fade-out{
        -webkit-animation: 0;
        animation: 0;
      }
    `;
  }
  // @ts-ignore
  if (css.length === 0) {
    return;
  }
  css.innerHTML = innerCss;
  document.body.appendChild(css);
}
