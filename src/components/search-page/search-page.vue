<template>
  <div class="SearchPage">
    <header class="SearchPage__header">
      <search-panel/>

      <sorting-dropdown v-if="totalUsersCount > 1" />
    </header>

    <users-list v-if="totalUsersCount > 0" />

    <span v-if="isQueryMade && totalUsersCount === 0">
      По вашему запросу ничего не найдено
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import SearchPanel from '@components/search-panel/search-panel.vue';
  import UsersList from '@components/users-list/users-list.vue';
  import SortingDropdown from '@components/sorting-dropdown/sorting-dropdown.vue';

  export default {
    components: {
      SearchPanel,
      UsersList,
      SortingDropdown,
    },
    computed: {
      ...mapState(['totalUsersCount', 'isQueryMade']),
    },
  }
</script>
