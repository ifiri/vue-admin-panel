<template>
  <v-app id="app">
    <loader :active="isLoading()"></loader>

    <v-app-bar app dark color="deep-purple accent-4" class="app__header header">
      <v-toolbar-title class="header__title">Администрирование</v-toolbar-title>

      <div class="header__menu menu">
        <router-link exact to="/" class="menu__link" active-class="menu__link--active">Продукты</router-link>
        <router-link to="/categories" class="menu__link" active-class="menu__link--active">Категории</router-link>
        <router-link to="/users" class="menu__link" active-class="menu__link--active">Пользователи</router-link>
        <router-link to="/orders" class="menu__link" active-class="menu__link--active">Заказы</router-link>
      </div>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import Loader from '@/components/loader';

@Observer
@Component({
  name: 'app',
  components: {
    'loader': Loader,
  }
})
export default class App extends Vue {
  isLoading() {
    return this.$store.isFetching;
  }
}
</script>

<style lang="scss">
:root {
  overflow: auto;
}

#app {
  color: #2c3e50;
}

.header {
  z-index: 100 !important;

  &__menu {
    margin-left: 25px;
  }
}

.menu {
  &__link {
    display: inline-block;
    padding: 10px 15px;

    text-decoration: none;
    color: rgba(255, 255, 255, 0.5) !important;

    &--active {
      color: #fff !important;
    }
  }
}

.md-select-menu {
  max-width: 50vw !important;

  &.md-select-menu {
    width: auto !important;
  }

  .md-menu-content-container .md-list {
    white-space: normal;
  }
}
</style>
