<template>
  <div class="UserPage">
    <router-link
      :to="{
        name: ROUTES.SEARCH,
      }"
    >
      Назад
    </router-link>

    <template v-if="user !== undefined">
      <h1>{{ user.name }}</h1>

      <img :src="user.avatarUrl" :alt="user.name">

      <a
          :href="user.profileUrl"
          target="_blank"
          rel="noopener norefferer"
      >
        Профиль
      </a>

      <a :href="user.reposUrl">Репозитории</a>
    </template>

    <span v-else>
      Пользователь не найден, проверьте введенный id
    </span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { VUEX_GETTERS, ROUTES } from '@scripts/constants';

  export default {
    data() {
      return {
        ROUTES,
      };
    },
    computed: {
      ...mapGetters([VUEX_GETTERS.GET_USER_BY_ID]),

      user() {
        return this.getUserById(this.$route.params.id);
      },
    },
  };
</script>
