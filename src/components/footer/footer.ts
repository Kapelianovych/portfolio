import style from './footer.module.css';
import { html } from '@prostory/edelweiss';

export default function Footer() {
  return html`<footer>
    <div class=${style['left-col']}>
      <span>Made by Kapelianovych Yevhen</span>
    </div>
    <a class=${style.mail} href="mailto:kapelianovych.y.v@gmail.com">Mail me</a>
  </footer>`;
}
