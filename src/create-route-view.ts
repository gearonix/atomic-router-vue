import type { RouteInstance, RouteParams } from 'atomic-router';
import { defineComponent, h } from 'vue';
import type { Component, DefineComponent } from 'vue';
import { useIsOpened } from './use-is-opened';

export interface RouteViewConfig<Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component | DefineComponent;
  otherwise?: Component | DefineComponent;
}

export function createRouteView<
  Params extends RouteParams,
  Config extends Partial<RouteViewConfig<Params>>,
>(config: Config) {
  return defineComponent({
    setup(props: RouteViewConfig<Params>) {
      const mergedConfig = { ...config, ...props } as RouteViewConfig<Params>;

      const isOpened = useIsOpened(mergedConfig.route);

      return { isOpened, mergedConfig };
    },
    render() {
      const { view, otherwise } = this.mergedConfig;

      if (this.isOpened)
        return h(view, this.$props);

      if (otherwise)
        return h(otherwise, this.$props);

      return null;
    },
  });
}
