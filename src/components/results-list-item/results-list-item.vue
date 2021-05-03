<template>
  <div class="ResultsListItem">
    <router-link
      :to="{
        name: ROUTES.USER,
        params: { id }
      }"
      class="ResultsListItem__link"
    >
      {{ name }}
    </router-link>
  </div>
</template>

<script>
  import { ROUTES } from '@scripts/constants';

  export default {
    data() {
      return {
        ROUTES,
      };
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  };
</script>
