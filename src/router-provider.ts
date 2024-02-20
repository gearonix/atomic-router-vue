import type { App, InjectionKey } from 'vue';
import { inject } from 'vue';
import { Link, Route } from './index';

export interface AtomicRouter {
  install: (app: App) => void;
}

// TODO: rewrite this type,
// unbuild breaks with external effector types for some reason
// when using ReturnType<typeof createHistoryRouter>
export type Router = any;

export const routerKey = Symbol('router') as InjectionKey<Router>;

export function createRouter(router: Router): AtomicRouter {
  return {
    install(app: App) {
      app.component('Route', Route);
      app.component('RouterLink', Link);

      app.config.globalProperties.$router = router;

      app.provide(routerKey, router);
    },
  };
}

export function useRouter() {
  const router = inject(routerKey);

  if (!router) {
    throw new Error(
      'useRouter() must be used within a component provided with the router instance',
    );
  }

  return router as Router;
}
