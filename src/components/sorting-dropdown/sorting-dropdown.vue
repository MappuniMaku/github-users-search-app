<template>
  <div class="SortingDropdown">
    <label class="SortingDropdown__label">
      <span class="SortingDropdown__labelText">
        Сортировка по количеству репозиториев
      </span>

      <select
        class="SortingDropdown__select"
        v-model="sortDirection"
        @change="setReposSortDirection(sortDirection)"
        :disabled="isQueryInProgress"
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
      ...mapGetters([VUEX_GETTERS.REPOS_SORT_DIRECTION, VUEX_GETTERS.IS_QUERY_IN_PROGRESS]),
    },
    beforeMount() {
      this.sortDirection = this.reposSortDirection;
    },
    methods: {
      ...mapMutations([VUEX_MUTATIONS.SET_REPOS_SORT_DIRECTION]),
    },
  };
</script>
