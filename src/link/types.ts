import type { RouteInstance, RouteParams, RouteQuery } from 'atomic-router';

export interface LinkProps<Params extends RouteParams> {
  to: RouteInstance<Params> | string;
  params?: Params;
  query?: RouteQuery;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export interface LinkEmits {
  (e: 'click', evt: MouseEvent): void;
}
