import style from './header.module.css';
import MenuButton from './menu_button/menu_button';
import { html, Router } from '@prostory/edelweiss';

export default function Header() {
  return html`<header>
    ${Router.current.path === '__PUBLIC_PREFIX_PATH__/about'
      ? html`<button @click=${() => Router.to('__PUBLIC_PREFIX_PATH__/')}>Home</button>`
      : MenuButton()}
    <div class=${style['right-col']}>
      <button @click=${() => Router.to('__PUBLIC_PREFIX_PATH__/about')}>About</button>
      <a href="https://github.com/YevhenKap">GitHub</a>
    </div>
  </header>`;
}
