<script setup lang="ts">
import { Link } from 'atomic-router-vue';
import { foo } from '../main';
</script>

<template>
  bar
  <Link :to="foo">
    foo
  </Link>
</template>

<style scoped>

</style>
