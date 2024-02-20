import type { RouteInstance, RouteParams, RouteQuery } from 'atomic-router';
import type { AnchorHTMLAttributes } from 'vue';

export interface LinkProps<Params extends RouteParams> extends AnchorHTMLAttributes {
  to: RouteInstance<Params> | string;
  params?: Params;
  query?: RouteQuery;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export interface LinkEmits {
  (e: 'click', evt: MouseEvent): void;
}
