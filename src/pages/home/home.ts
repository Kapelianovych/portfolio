import me from './me.png';
import style from './home.module.css';
import { html } from '@prostory/edelweiss';
import { portfolioModal } from './portfolio_modal/portfolio_modal';

export const TypedElementId = 'short-description';

export default function HomePage() {
  return html`
    <div class=${style.home}>
      <div class=${style['portrait-block']}>
        <img
          class=${style.portrait}
          src="${me}"
          alt="Creator picture: Kapelianovych Yevhen"
        />
        <div class=${style['portrait-hover-block']}></div>
      </div>
      <p
        class=${style['typed-block']}
      >
        <span id="${TypedElementId}"></span>
      </p>
      ${portfolioModal()}
    </div>
  `;
}
