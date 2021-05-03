<template>
  <ul class="UsersList" v-if="users.length > 0">
    <li v-for="user in users" :key="user.id">
      <span v-text="user.login"></span>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['users']),
    },
  };
</script>
