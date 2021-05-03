<template>
  <div class="SearchPage">
    <header class="SearchPage__header">
      <search-panel/>
    </header>

    <users-list/>
  </div>
</template>

<script>
  import SearchPanel from '@components/search-panel/search-panel.vue';
  import UsersList from '@components/users-list/users-list.vue';

  export default {
    components: {
      SearchPanel,
      UsersList,
    },
  }
</script>
