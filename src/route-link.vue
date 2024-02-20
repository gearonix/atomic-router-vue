<script setup lang="ts" generic="Params extends RouteParams">
import type { RouteInstance, RouteParams } from 'atomic-router'
import { buildPath } from 'atomic-router'
import { useUnit } from 'effector-vue/composition'
import { computed } from 'vue'
import type { LinkProps } from './link.vue'
import { useRouter } from './router'

const {
  to,
  params,
  query,
  className,
  activeClassName,
  inactiveClassName,
  onClick,
  target,
  ...linkProps
} = defineProps<Exclude<LinkProps<Params>, 'to'> & { to: RouteInstance<Params> }>()

const router = useRouter()

const routeObj = router.routes.find(routeObj => routeObj.route === to)

if (!routeObj)
  throw new Error('[RouteLink] Route not found')

const [isOpened, navigate] = useUnit([routeObj.route.$isOpened, to])

const href = computed(() => {
  return buildPath({
    pathCreator: routeObj.path,
    params: params || {},
    query: query || {},
  })
})

function handleClick(evt: MouseEvent) {
  if (onClick)
    onClick(evt)

  if (evt.defaultPrevented)
    return

  if (target && target !== '_self')
    return

  if (evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey)
    return

  evt.preventDefault()
  navigate({
    params: params || ({} as Params),
    query: query || {},
  })
}
</script>

<template>
  <a
    :href="href"
    :class="[className, isOpened ? activeClassName : inactiveClassName]"
    :target="target"
    v-bind="linkProps"
    @click="handleClick"
  >
    <slot />
  </a>
</template>
