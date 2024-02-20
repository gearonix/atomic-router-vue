<script setup lang="ts" generic="Params extends RouteParams">
import type { RouteInstance, RouteParams } from 'atomic-router';
import type { Component, DefineComponent } from 'vue';
import { useIsOpened } from './use-is-opened';

interface Props<Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: Component | DefineComponent;
}

const { route, view } = defineProps<Props<Params>>();

const isOpened = useIsOpened(route);
</script>

<template>
  <template v-if="isOpened">
    <component :is="view" />
  </template>
</template>
