<template>
  <div class="loader" v-if="loading">
    <v-progress-circular
      class="loader__spinner"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'loader',
  props: {
    active: Boolean,
    default: true,
  },
  data: () => ({
    isLoaded: false,
  }),
})
export default class Loader extends Vue {
  get loading() {
    return this.active;
  }

  updated() {
    // Prevent unwanted loader flashes after application loaded
    if (!this.active) {
      this.isLoaded = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.75);

  top: 65px; // header height @todo remove magic value
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 50;

  &__spinner {
    transform: scale(2);
    z-index: 75;
  }
}
</style>
