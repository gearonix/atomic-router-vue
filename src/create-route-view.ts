import type { RouteInstance, RouteParams } from 'atomic-router';
import { defineComponent, h } from 'vue';
import type { Debug, RouteComponent } from './shared';
import { useIsOpened } from './use-is-opened';

export interface RouteViewConfig<Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: RouteComponent;
  otherwise?: RouteComponent;
}

export function createRouteView<
  Params extends RouteParams,
  Config extends Debug<RouteViewConfig<Params>>,
>(config: Config) {
  return defineComponent({
    setup(props: RouteViewConfig<Params>) {
      const isOpened = useIsOpened(props.route);

      return { isOpened };
    },
    render() {
      const mergedConfig = { ...config, ...this.$props } as RouteViewConfig<Params>;

      if (this.isOpened)
        return h(mergedConfig.view, this.$props);

      if (mergedConfig.otherwise)
        return h(mergedConfig.otherwise, this.$props);

      return null;
    },
  });
}
