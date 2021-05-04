<template>
  <div class="SearchPanel">
    <input
        class="SearchPanel__input Input"
        type="text"
        v-model="query"
        placeholder="Введите никнейм"
        maxlength="39"
        @keypress.enter="changeQuery"
    >

    <button
        class="SearchPanel__button Button"
        type="button"
        @click="changeQuery"
        :disabled="isInputDisabled"
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

      isInputDisabled() {
        return (
            this.isQueryInProgress
            || this.query === ''
            || this.query === this.searchQuery
        );
      },
    },
    beforeMount() {
      this.query = this.searchQuery;
    },
    methods: {
      ...mapMutations([VUEX_MUTATIONS.SET_SEARCH_QUERY]),

      changeQuery() {
        if (this.isInputDisabled) {
          return;
        }

        this.setSearchQuery(this.query);
      },
    },
  };
</script>
