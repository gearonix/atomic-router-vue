import type { createHistoryRouter } from 'atomic-router'
import type { App, InjectionKey } from 'vue'
import { inject } from 'vue'
import Link from './link.vue'
import Route from './route.vue'

export interface AtomicRouter {
  install: (app: App) => void
}

export type Router = ReturnType<typeof createHistoryRouter>

export const routerKey = Symbol('router') as InjectionKey<Router>

export const isBrowser = typeof document !== 'undefined'

export function createRouter(router: Router): AtomicRouter {
  return {
    install(app: App) {
      app.component('Route', Route)
      app.component('RouterLink', Link)

      app.config.globalProperties.$router = router

      app.provide(routerKey, router)
    },
  }
}

export function useRouter() {
  const router = inject(routerKey)

  if (!router) {
    throw new Error(
      'useRouter() must be used within a component provided with the router instance',
    )
  }

  return router as Router
}
