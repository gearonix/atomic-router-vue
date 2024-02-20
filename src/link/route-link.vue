<script setup lang="ts" generic="Params extends RouteParams">
import type { RouteInstance, RouteParams } from 'atomic-router';
import { useUnit } from 'effector-vue/composition';
import { useRouter } from '../router-provider';
import { useLink } from '../use-link';
import type { LinkEmits, LinkProps } from './types';

const props = defineProps<LinkProps<Params>>();

const emit = defineEmits<LinkEmits>();

const {
  params,
  query,
  target,
} = props;

const route = props.to as RouteInstance<Params>;

const router = useRouter();

const routeObj = router.routes.find(routeObj => routeObj.route === route);

if (!routeObj)
  throw new Error('[RouteLink] Route not found');

const [isOpened, navigate] = useUnit([routeObj.route.$isOpened, route.navigate]);

const href = useLink(
  route,
  params,
  query,
);

function handleClick(evt: MouseEvent) {
  emit('click', evt);

  if (evt.defaultPrevented)
    return;

  if (target && target !== '_self')
    return;

  if (evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey)
    return;

  evt.preventDefault();
  navigate({
    params: params || ({} as Params),
    query: query || {},
  });
}
</script>

<template>
  <a
    v-bind="props"
    :href="href"
    :class="[className, isOpened ? activeClassName : inactiveClassName]"
    :target="target"
    @click="handleClick"
  >
    <slot />
  </a>
</template>
