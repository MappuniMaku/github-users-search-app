<template>
  <div class="SearchPanel">
    <input
        type="text"
        v-model="query"
        placeholder="User name"
        maxlength="39"
    >

    <button
        type="button"
        @click="getUsers"
        :disabled="isQueryEmpty || isLoading"
    >
      Get users
    </button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { VUEX_ACTIONS, VUEX_GETTERS } from '@scripts/constants';

  export default {
    data() {
      return {
        query: '',
        isLoading: false,
      }
    },
    computed: {
      ...mapGetters([VUEX_GETTERS.USERS_COUNT]),

      isQueryEmpty() {
        return this.query === '';
      },
    },
    methods: {
      ...mapActions([VUEX_ACTIONS.SEARCH_USERS_BY_NAME]),

      getUsers() {
        if (this.query === '') return;
        this.isLoading = true;

        this[VUEX_ACTIONS.SEARCH_USERS_BY_NAME]({
          q: this.query,
          sort: 'repositories',
          order: 'desc',
          per_page: 30,
        })
        .finally(() => {
          this.isLoading = false
        });
      },
    },
  };
</script>
