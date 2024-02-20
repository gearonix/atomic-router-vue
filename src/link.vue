<script setup lang="ts" generic="Params extends RouteParams">
import type { RouteInstance, RouteParams, RouteQuery } from 'atomic-router'
import type { AnchorHTMLAttributes } from 'vue'
import { shallowRef } from 'vue'
import RouteLink from './route-link.vue'

export interface LinkProps<Params extends RouteParams> extends AnchorHTMLAttributes {
  to: RouteInstance<Params> | string
  params?: Params
  query?: RouteQuery
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

export interface LinkEmits {
  (e: 'click', evt: MouseEvent): void
}

const props = defineProps<LinkProps<Params>>()

const emit = defineEmits<LinkEmits>()

const linkRef = shallowRef<HTMLAnchorElement>()

function onRouteClick(evt: MouseEvent) {
  emit('click', evt)
}

defineExpose({
  linkRef,
})
</script>

<template>
  <template v-if="typeof to === 'string'">
    <a
      v-bind="props"
      ref="linkRef" :href="to" :class="className"
    >
      <slot />
    </a>
  </template>
  <template v-else>
    <RouteLink v-bind="props" @click="onRouteClick" />
  </template>
</template>
