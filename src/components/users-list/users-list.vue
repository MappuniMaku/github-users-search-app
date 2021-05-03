<template>
  <ul class="UsersList">
    <li
        class="UsersList__item"
        v-for="user in users"
        :key="user.id"
    >
      <users-list-item
        :id="user.id"
        :name="user.name"
      ></users-list-item>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex';
  import UsersListItem from '@components/users-list-item/users-list-item.vue';

  export default {
    components: {
      UsersListItem,
    },
    computed: {
      ...mapState(['users']),
    },
  };
</script>
