import type { RouteInstance, RouteParams, RouteQuery } from 'atomic-router';
import { buildPath } from 'atomic-router';

import { computed } from 'vue';
import type { MaybeRef } from 'vue';
import { useRouter } from './router-provider';

export function useLink<Params extends RouteParams>(
  route: RouteInstance<Params>,
  params: Params,
  query: RouteQuery = {},
): MaybeRef<string> {
  const router = useRouter();

  // @ts-expect-error breaks because Router has any type for now
  const routeObj = router.routes.find(routeObj => routeObj.route === route);

  if (!routeObj)
    throw new Error(`[useLink] Route not found. Maybe it is not passed into createHistoryRouter`);

  return computed(() => {
    return buildPath({
      pathCreator: routeObj.path,
      params,
      query,
    });
  });
}
