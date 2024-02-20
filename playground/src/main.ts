import { createApp } from 'vue';

import { createRouter, createRoutesView } from 'atomic-router-vue';

import { createHistoryRouter, createRoute } from 'atomic-router';
import { createBrowserHistory } from 'history';
import App from './app.vue';
import { Bar, Baz, Foo } from './routes';
import Layout from './layout.vue';

export const foo = createRoute();
export const bar = createRoute();
export const barBaz = createRoute();

const routes = [
  { path: '/', route: foo },
  { path: '/bar', route: bar },
  { path: '/bar-baz', route: barBaz },
];

const router = createHistoryRouter({
  routes,
});

export const Routes = createRoutesView({
  routes: [
    { route: foo, view: Foo, layout: Layout },
    { route: bar, view: Bar },
    { route: barBaz, view: Baz },
  ],
});

router.setHistory(createBrowserHistory());

const app = createApp(App);

app.use(createRouter(router));

app.mount('#app');
