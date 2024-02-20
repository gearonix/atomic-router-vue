<script setup lang="ts" generic="Params extends RouteParams">
import type { RouteInstance, RouteParams } from 'atomic-router'
import { buildPath } from 'atomic-router'
import { useUnit } from 'effector-vue/composition'
import { computed } from 'vue'
import type { LinkEmits, LinkProps } from './link.vue'
import { useRouter } from './router'

const props = defineProps<LinkProps<Params>>()

const emit = defineEmits<LinkEmits>()

const {
  params,
  query,
  target,
} = props

const toAsInstance = props.to as RouteInstance<Params>

const router = useRouter()

const routeObj = router.routes.find(routeObj => routeObj.route === toAsInstance)

if (!routeObj)
  throw new Error('[RouteLink] Route not found')

const [isOpened, navigate] = useUnit([routeObj.route.$isOpened, toAsInstance.navigate])

const href = computed(() => {
  return buildPath({
    pathCreator: routeObj.path,
    params: params || {},
    query: query || {},
  })
})

function handleClick(evt: MouseEvent) {
  emit('click', evt)

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
    v-bind="props"
    :href="href"
    :class="[className, isOpened ? activeClassName : inactiveClassName]"
    :target="target"
    @click="handleClick"
  >
    <slot />
  </a>
</template>
