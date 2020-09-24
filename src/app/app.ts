import 'sanitize.css';
import './app.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import HomePage from '../pages/home/home';
import { html } from '@prostory/edelweiss';
import { about } from '../pages/about/about';

export default function app(name: 'home' | 'about') {
  return html`
    ${Header()}
    <main>
      ${name === 'home' ? HomePage() : name === 'about' ? about() : ''}
    </main>
    ${Footer()}
  `;
}
