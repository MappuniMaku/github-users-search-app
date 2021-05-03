import Vue from 'vue';
import VueRouter from 'vue-router';
import UserPage from '@components/user-page/user-page.vue';
import SearchPage from '@components/search-page/search-page.vue';
import { ROUTES } from '@scripts/constants';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            name: ROUTES.SEARCH,
            path: '/',
            component: SearchPage,

        },
        {
            name: ROUTES.USER,
            path: '/user/:id',
            component: UserPage,
        },
    ],
});
