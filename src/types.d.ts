import Vue from 'vue';
import { IStore } from './store';

declare module 'vue/types/vue' {
  interface Vue {
    $store: IStore
  }
}
