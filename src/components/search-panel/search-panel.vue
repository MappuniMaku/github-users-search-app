<template>
  <div class="SearchPanel">
    <input
        type="text"
        v-model="query"
        placeholder="Никнейм пользователя"
        maxlength="39"
        @keypress.enter="changeQuery"
    >

    <button
        type="button"
        @click="changeQuery"
        :disabled="isQueryEmpty || isQueryInProgress"
    >
      Найти
    </button>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { VUEX_GETTERS, VUEX_MUTATIONS } from '@scripts/constants';

  export default {
    data() {
      return {
        query: '',
        isLoading: false,
      };
    },
    computed: {
      ...mapGetters([VUEX_GETTERS.SEARCH_QUERY, VUEX_GETTERS.IS_QUERY_IN_PROGRESS]),

      isQueryEmpty() {
        return this.query === '';
      },
    },
    beforeMount() {
      this.query = this.searchQuery;
    },
    methods: {
      ...mapMutations([VUEX_MUTATIONS.SET_SEARCH_QUERY]),

      changeQuery() {
        if (this.isQueryInProgress) {
          return;
        }

        this.setSearchQuery(this.query);
      },
    },
  };
</script>
