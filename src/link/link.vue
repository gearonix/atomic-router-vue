<script setup lang="ts" generic="Params extends RouteParams">
import type { RouteParams } from 'atomic-router';
import { shallowRef } from 'vue';
import RouteLink from './route-link';
import type { LinkEmits, LinkProps } from './types';

const props = defineProps<LinkProps<Params>>();

const emit = defineEmits<LinkEmits>();

const linkRef = shallowRef<HTMLAnchorElement>();

function onRouteClick(evt: MouseEvent) {
  emit('click', evt);
}

defineExpose({
  linkRef,
});
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
