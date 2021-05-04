<template>
  <div class="SearchPage">
    <header class="SearchPage__header">
      <search-panel/>
    </header>

    <div class="SearchPage__main" v-show="!isQueryInProgress">
      <search-results v-if="totalUsersCount > 0" />

      <span v-if="isQueryMade && totalUsersCount === 0">
        По вашему запросу ничего не найдено
      </span>
    </div>

    <loading-spinner v-show="isQueryInProgress" />
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { VUEX_ACTIONS, VUEX_GETTERS } from '@scripts/constants';
  import SearchPanel from '@components/search-panel/search-panel.vue';
  import SearchResults from '@components/search-results/search-results.vue';
  import LoadingSpinner from '@components/loading-spinner/loading-spinner.vue';

  export default {
    components: {
      SearchPanel,
      SearchResults,
      LoadingSpinner,
    },
    computed: {
      ...mapState(['totalUsersCount']),

      ...mapGetters([
        VUEX_GETTERS.SEARCH_QUERY,
        VUEX_GETTERS.IS_QUERY_MADE,
        VUEX_GETTERS.REPOS_SORT_DIRECTION,
        VUEX_GETTERS.IS_QUERY_IN_PROGRESS,
      ]),
    },
    methods: {
      ...mapActions([VUEX_ACTIONS.SEARCH_USERS_BY_NAME]),

      searchUsers() {
        if (this.isQueryInProgress) {
          return;
        }

        this.searchUsersByName();
      },
    },
    watch: {
      searchQuery() {
        this.searchUsers();
      },

      reposSortDirection() {
        this.searchUsers();
      },
    },
  }
</script>
