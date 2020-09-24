import style from './menu_button.module.css';
import { html } from '@prostory/edelweiss';
import { state } from '../../../state';

export default function MenuButton() {
  return html`<button
    @click=${() => (state.isPortfolioVisible = !state.isPortfolioVisible)}
    aria-label="menu button"
    class=${style['menu-button']}
  >
    <span class=${style['menu-line']}></span
    ><span class=${style['menu-line']}></span
    ><span class=${style['menu-line']}></span>
  </button>`;
}
