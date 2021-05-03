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
        :disabled="isQueryEmpty || isLoading"
    >
      Найти
    </button>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { VUEX_ACTIONS, VUEX_GETTERS, VUEX_MUTATIONS } from '@scripts/constants';

  export default {
    data() {
      return {
        query: '',
        isLoading: false,
      };
    },
    computed: {
      ...mapState(['searchQuery']),

      ...mapGetters([VUEX_GETTERS.REPOS_SORT_DIRECTION]),

      isQueryEmpty() {
        return this.query === '';
      },
    },
    beforeMount() {
      this.query = this.searchQuery;
    },
    methods: {
      ...mapMutations([VUEX_MUTATIONS.SET_SEARCH_QUERY]),

      ...mapActions([VUEX_ACTIONS.SEARCH_USERS_BY_NAME]),

      changeQuery() {
        if (this.isLoading) {
          return;
        }

        this[VUEX_MUTATIONS.SET_SEARCH_QUERY](this.query);

        this.searchUsers();
      },

      searchUsers() {
        if (this.isLoading) {
          return;
        }

        this.isLoading = true;

        this[VUEX_ACTIONS.SEARCH_USERS_BY_NAME]()
          .finally(() => {
            this.isLoading = false
          });
      },
    },
    watch: {
      [VUEX_GETTERS.REPOS_SORT_DIRECTION]() {
        this.searchUsers();
      },
    },
  };
</script>
