import type { Component, DefineComponent } from 'vue';

export type RouteComponent = Component | DefineComponent;

export type Debug<T> = {
  [K in keyof T]: T[K];
};
