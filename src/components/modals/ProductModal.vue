<template>
  <fragment>
    <v-dialog
      v-model="productModal"
      content-class="modal modal--product"
    >
      <v-card>
        <v-card-title class="modal__title" primary-title>
          Редактирование продукта
        </v-card-title>

        <div class="modal__content">
          <v-form method="post" class="form form--product" ref="modalForm">
            <div class="form__item">
              <v-text-field
                label="Название"
                class="form__field"

                :value="entity && entity.name"
                :hide-details="true"
                @change="onInputChange('name', $event)"
              ></v-text-field>
            </div>

            <div class="form__item">
              <v-text-field
                label="Год"
                class="form__field"

                :value="entity && entity.year"
                :hide-details="true"
                @change="onInputChange('year', $event)"
              ></v-text-field>
            </div>

            <div class="form__item">
              <v-text-field
                label="Цена"
                class="form__field"

                :value="entity && entity.price"
                :hide-details="true"
                @change="onInputChange('price', $event)"
              ></v-text-field>
            </div>

            <div class="form__item">
              <v-text-field
                label="Цвет"
                class="form__field"

                :value="entity && entity.color.hex"
                :hide-details="true"
                @change="onInputChange('color.hex', $event)"
              ></v-text-field>
            </div>

            <div class="form__item">
              <categories-select
                label="Категория"

                :entity="entity"
                :value="entity && entity.category"

                :onlyFinalNodes="true"
              ></categories-select>
            </div>
          </v-form>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="closeModal">
            Закрыть
          </v-btn>

          <v-btn color="primary" @click="onSaveButtonClick">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </fragment>
</template>

<script>
import dotty from 'dotty';
import { Component, Vue } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { action } from 'mobx';

import useDeepCopy from '@/effects/useDeepCopy';
import useModelProps from '@/effects/useModelProps';
import ProductModel from '@/store/models/products/product';
import { CategoriesSelect } from '@/components/categories-select';

@Observer
@Component({
  name: 'product-modal',
  props: {
    modal: Object,
    entity: Object,
  },

  components: {
    'categories-select': CategoriesSelect,
  },

  data: () => ({
    changes: {},
  })
})
export default class ProductModal extends Vue {
  get productModal() {
    return !!this.modal && this.modal.type === 'product';
  }

  onInputChange(property, value) {
    value && dotty.put(this.changes, property, value);
  }

  set productModal(value) {
    this.closeModal();
  }

  // @todo sanitizer flow
  // @todo dry {2}
  sanitize(changes) {
    const final = Object.entries(changes).map(change => {
      const key = change[0];
      const value = change[1];

      if (!value) {
        if (this.entity[key]) {
          change[1] = this.entity[key];
        }
      } else {
        switch (key) {
          case 'year':
          case 'price':
            change[1] = parseInt(value);
            break;

          case 'color':
            // @todo редактирование имени цвета (?)
            change[1] = value;
            break;

          case 'activity':
            change[1] = null;
            break;
        }
      }

      return change;
    });

    return Object.fromEntries(final);
  }

  onSaveButtonClick(event) {
    this.changes = this.sanitize(this.changes);

    this.updateProduct(this.changes).then(response => {
      this.closeModal();
    });

    event.preventDefault();
  }

  created() {
    this.resetCurrentProduct();
  }

  updated() {
    if (!this.entity) {
      this.changes.name && this.resetCurrentProduct();
    }
  }

  resetCurrentProduct() {
    this.changes = useModelProps(ProductModel);
  }

  @action.bound
  updateProduct(values) {
    console.log('::: update values', values);
    return this.$store.updateProduct(this.entity, values);
  }

  @action.bound
  closeModal() {
    this.$store.clearOpenedModal();
  }
};
</script>

<style lang="scss">
.modal {
  overflow: visible;
  max-height: none;

  &__content {
    padding: 0 20px;
  }

  &--product {
    width: 500px;
  }
}

// @todo формы в отдельный спектр компонентов
// оберток над vuetify
.form {
  &__item {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
