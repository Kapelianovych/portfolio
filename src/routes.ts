import app from './app/app';
import Typed from './typedJs/typed';
import { Router } from '@prostory/edelweiss';
import { TypedElementId } from './pages/home/home';

Router.container = '#app';
Router.add([
  {
    path: '/',
    view() {
      return app('home');
    },
    after() {
      new Typed(`#${TypedElementId}`, {
        strings: ['Boy', 'Dentist', 'Web Programmer'],
        loop: true,
        typeSpeed: 100,
        backSpeed: 100,
        smartBackspace: true,
      }).start();
    },
  },
  {
    path: '/about',
    view() {
      return app('about');
    },
  },
]);
