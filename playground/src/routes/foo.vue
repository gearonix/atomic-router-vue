<script setup lang="ts">
import { Link } from 'atomic-router-vue';
import { bar, barBaz } from '../main';
</script>

<template>
  foo
  <Link :to="bar">
    bar
  </Link>
  <Link :to="barBaz">
    baz
  </Link>
</template>

<style scoped>

</style>
