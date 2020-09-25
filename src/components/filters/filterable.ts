import { action } from 'mobx';
import useDebounce from '@/effects/useDebounce';

const Filterable = entityType => component => class extends component {
  constructor(...args) {
    super(...args);

    if (!this.getQuery) {
      this.getQuery = () => ({});
    }

    if (!this.delay) {
      this.delay = 1500;
    }

    this.onFilterChange = this.onFilterChange.bind(this);
    this.filter = this.filter.bind(this);

    this.debounced = useDebounce(this.filter, this.delay);
  }

  onFilterChange(event) {
    this.debounced();
  }

  @action
  filter() {
    this.$store.fetch([
      entityType
    ], this.getQuery());
  }
};

export default Filterable;
