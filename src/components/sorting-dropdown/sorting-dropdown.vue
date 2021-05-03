<template>
  <div class="SortingDropdown">
    <label class="SortingDropdown__label">
      <span class="SortingDropdown__labelText">
        Сортировка по количеству репозиториев
      </span>

      <select
        class="SortingDropdown__select"
        v-model="sortDirection"
        @change="changeSortDirection"
      >
        <option :value="SORT_DIRECTIONS.ASC">По возрастанию</option>
        <option :value="SORT_DIRECTIONS.DESC">По убыванию</option>
      </select>
    </label>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { SORT_DIRECTIONS, VUEX_GETTERS, VUEX_MUTATIONS } from '@scripts/constants';

  export default {
    data() {
      return {
        sortDirection: null,
        SORT_DIRECTIONS,
        VUEX_MUTATIONS,
      };
    },
    computed: {
      ...mapGetters([VUEX_GETTERS.REPOS_SORT_DIRECTION]),
    },
    beforeMount() {
      this.sortDirection = this[VUEX_GETTERS.REPOS_SORT_DIRECTION];
    },
    methods: {
      ...mapMutations([VUEX_MUTATIONS.SET_REPOS_SORT_DIRECTION]),

      changeSortDirection() {
        this[VUEX_MUTATIONS.SET_REPOS_SORT_DIRECTION](this.sortDirection);
      },
    },
  };
</script>
