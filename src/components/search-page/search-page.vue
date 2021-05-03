<template>
  <div class="SearchPage">
    <header class="SearchPage__header">
      <search-panel/>
    </header>

    <search-results v-if="totalUsersCount > 0" />

    <span v-if="isQueryMade && totalUsersCount === 0">
      По вашему запросу ничего не найдено
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import SearchPanel from '@components/search-panel/search-panel.vue';
  import SearchResults from '@components/search-results/search-results.vue';

  export default {
    components: {
      SearchPanel,
      SearchResults,
    },
    computed: {
      ...mapState(['totalUsersCount', 'isQueryMade']),
    },
  }
</script>
