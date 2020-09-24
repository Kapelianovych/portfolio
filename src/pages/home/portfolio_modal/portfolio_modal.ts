import style from './portfolio_modal.module.css';
import image from './edelweiss_website.png';
import { html } from '@prostory/edelweiss';
import { state } from '../../../state';

export function portfolioModal() {
  return html`
    <aside
      class="${state.isPortfolioVisible ? style.visible : ''} ${style[
        'portfolio-modal'
      ]}"
      @transitionend=${(event: Event) => {
        (event.target as HTMLElement).classList.toggle(style.background);
      }}
    >
      <h2>Portfolio</h2>
      <div class=${style.carousel}>
        <a
          href="https://github.com/YevhenKap/edelweiss"
          class=${style['portfolio-item']}
        >
          <img src="${image}" alt="Edelweiss website" />
          <p>Edelweiss website (WIP)</p>
        </a>
      </div>
    </aside>
  `;
}
