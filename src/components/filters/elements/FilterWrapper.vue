<template>
  <v-form method="post" class="filter">
    <v-subheader class="filter__header">
      <v-icon>filter_list</v-icon>
      <span class="filter__title">
        <slot name="title">Фильтр по параметрам</slot>
      </span>
    </v-subheader>

    <div class="filter__fields">
      <slot name="content"></slot>
    </div>
  </v-form>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'filter-wrapper',
  props: {
    type: {
      type: String,
      default: null,
    }
  },
  data: () => ({
    email: null,
  }),
})
export default class FilterWrapper extends Vue {
  get filtersClass() {
    if (this.type) {
      return `filters--${this.type}`;
    }

    return 'filters';
  }
}
</script>

<style lang="scss">
.filter {
  margin: 0;

  &__header {
    margin-bottom: 15px;
    padding-left: 5px;
    padding-right: 0px;
  }

  &__title {
    margin-left: 15px;
  }

  .md-subhead {
    opacity: 1;

    .md-icon {
      margin-right: 15px;
    }
  }

  &__fields {
    display: flex;

    justify-content: space-between;
  }

  &__field {
    width: 25%;
    flex-grow: 0;
    margin: 0 auto 0 25px;
    padding: 0;

    input {
      height: auto;
    }

    label {
      top: .5em;
    }

    &.md-focused,
    &.md-has-value {
      label {
        top: -1em;
      }
    }
  }

  &__submit {
    //
  }
}
</style>
