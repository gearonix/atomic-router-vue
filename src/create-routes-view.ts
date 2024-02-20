import type { RouteInstance, RouteParams } from 'atomic-router';
import { computed, defineComponent, h, unref } from 'vue';
import type { Component, DefineComponent } from 'vue';
import { useIsOpened } from './use-is-opened';

export interface RouteRecord<Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component | DefineComponent;
  layout?: Component | DefineComponent;
}

export interface RoutesViewConfig {
  routes: RouteRecord<any>[];
  otherwise?: Component | DefineComponent;
}

export function createRoutesView<Config extends RoutesViewConfig>(config: Config) {
  return defineComponent({
    setup(props: Omit<Config, keyof Config>) {
      const mergedConfig = { ...config, ...props } as Config;

      const routes = computed(() =>
        mergedConfig.routes.map((routeRecord) => {
          const isOpened = useIsOpened(routeRecord.route);

          return { ...routeRecord, isOpened };
        }),
      );

      return {
        mergedConfig,
        routes,
      };
    },
    render() {
      for (const route of this.routes) {
        const isOpened = unref(route.isOpened);

        if (isOpened) {
          if (route.layout) {
            return h(
              route.layout,
              {},
              {
                default: () => h(route.view),
              },
            );
          }

          return h(route.view);
        }
      }

      const { otherwise } = this.mergedConfig;

      if (otherwise)
        return h(otherwise);

      return null;
    },
  });
}
