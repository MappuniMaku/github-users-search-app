<template>
  <div class="UserPage">
    <router-link
      :to="{
        name: ROUTES.SEARCH,
      }"
      class="UserPage__backLink"
    >
      Назад
    </router-link>

    <div v-if="user !== undefined" class="UserPage__contentWrapper">
      <h1 class="UserPage__name">{{ user.name }}</h1>

      <img
          class="UserPage__image"
          :src="user.avatarUrl"
          :alt="user.name"
      >

      <a
          class="UserPage__profileLink"
          :href="user.profileUrl"
          target="_blank"
          rel="noopener norefferer"
      >
        Профиль
      </a>
    </div>

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
