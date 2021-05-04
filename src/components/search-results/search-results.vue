<template>
  <div class="SearchResults">
    <div class="SearchResults__sorting">
      <sorting-dropdown v-if="totalUsersCount > 1" />
    </div>

    <ul class="SearchResults__list" ref="list">
      <li
        class="SearchResults__listItem"
        v-for="user in users"
        :key="user.id"
      >
        <results-list-item
          :id="user.id"
          :name="user.name"
        ></results-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { VUEX_GETTERS, VUEX_ACTIONS } from '@scripts/constants';
  import SortingDropdown from '@components/sorting-dropdown/sorting-dropdown.vue';
  import ResultsListItem from '@components/results-list-item/results-list-item.vue';

  export default {
    data() {
      return {
        scrollObserver: null,
        isLoading: false,
      };
    },
    components: {
      SortingDropdown,
      ResultsListItem,
    },
    computed: {
      ...mapState(['users', 'totalUsersCount']),

      ...mapGetters([VUEX_GETTERS.USERS_COUNT, VUEX_GETTERS.LAST_REQUEST_TIME]),
    },
    mounted() {
      this.setScrollObserver();
    },
    methods: {
      ...mapActions([VUEX_ACTIONS.GET_NEXT_USERS_PAGE]),

      setScrollObserver() {
        if (this.usersCount >= this.totalUsersCount) {
          return;
        }

        const options = {
          root: null,
          threshold: 1,
        };

        const target = this.$refs['list'].lastElementChild;

        const callback = (entries) => {
          const entry = entries[0];

          if (!entry.isIntersecting) {
            return;
          }

          this.isLoading = true;
          this.scrollObserver.unobserve(target);

          this.getNextUsersPage()
            .finally(() => {
              this.isLoading = false;
            });
        }

        this.scrollObserver = new IntersectionObserver(callback, options);

        this.scrollObserver.observe(target);
      },
    },
    watch: {
      lastRequestTime() {
        this.$nextTick()
          .then(this.setScrollObserver);
      },
    },
  };
</script>
