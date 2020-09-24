import style from './about.module.css';
import { html } from '@prostory/edelweiss';

export function about() {
  return html`
    <div class=${style['about-page']}>
      <p>
        I am a big lover of programming. I have graduated at
        <a href="https://brainacad.zp.ua/">Brain Academy</a> as Certified
        Associate in Frontend in 2018.
      </p>
      <p>
        Now I spend my free time developing my own projects. They are all
        located in my Github account.
      </p>
      <p>
        Feel free to contact me:
        <a href="mailto:kapelianovych.y.v@gmail.com"
          >kapelianovych.y.v@gmail.com</a
        >
      </p>
    </div>
  `;
}
