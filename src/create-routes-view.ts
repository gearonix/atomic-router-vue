import type { RouteInstance, RouteParams } from 'atomic-router';
import { computed, defineComponent, h } from 'vue';
import type { RouteComponent } from './shared';
import { useIsOpened } from './use-is-opened';

export interface RouteRecord<Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: RouteComponent;
  layout?: RouteComponent;
}

export interface RoutesViewConfig {
  routes: RouteRecord<any>[];
  otherwise?: RouteComponent;
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
        if (route.isOpened) {
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

      if (this.mergedConfig.otherwise)
        return h(this.mergedConfig.otherwise);

      return null;
    },
  });
}
