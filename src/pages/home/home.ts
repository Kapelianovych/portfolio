import me from './me.png';
import style from './home.module.css';
import { html } from '@prostory/edelweiss';
import { state } from '../../state';
import { portfolioModal } from './portfolio_modal/portfolio_modal';

export const TypedElementId = 'short-description';

export default function HomePage() {
  return html`
    <div class=${style.home}>
      <div class=${style['portrait-block']}>
        <img src="${me}" alt="Creator picture: Kapelianovych Yevhen" />
      </div>
      <div
        :mounted=${() => (state.isWelcomeTextVisible = true)}
        class="${style['typed-block']} ${state.isWelcomeTextVisible
          ? style.visible
          : ''}"
      >
        <p class=${style['typed-left']}>Hi I'm</p>
        <p class=${style['typed-center']}>Developer</p>
        <p class=${style['typed-right']}>Web</p>
      </div>
      ${portfolioModal()}
    </div>
  `;
}
