import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { apiGetUsersByName } from '@scripts/api-methods';
import {
    VUEX_MUTATIONS,
    VUEX_ACTIONS,
    VUEX_GETTERS,
    SORT_DIRECTIONS,
} from '@scripts/constants';
import { mapGetUsersByNameResponse } from '@scripts/mappings';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    key: 'store',
});

export const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        users: [],
        totalUsersCount: 0,
        searchQuery: '',
        isQueryMade: false,
        sorting: {
            repos: {
                direction: SORT_DIRECTIONS.DESC,
            },
        },
    },
    mutations: {
        [VUEX_MUTATIONS.SET_SEARCH_RESULTS](state, result) {
            state.users = result.items;
            state.totalUsersCount = result.totalCount;
            state.isQueryMade = true;
        },

        [VUEX_MUTATIONS.SET_SEARCH_QUERY](state, query) {
            state.searchQuery = query;
        },

        [VUEX_MUTATIONS.SET_REPOS_SORT_DIRECTION](state, direction) {
            state.sorting.repos.direction = direction;
        },
    },
    actions: {
        [VUEX_ACTIONS.SEARCH_USERS_BY_NAME]({ commit }, payload) {
            return apiGetUsersByName(payload)
                .then(mapGetUsersByNameResponse)
                .then(result => {
                    console.log(result);
                    commit(VUEX_MUTATIONS.SET_SEARCH_RESULTS, result);
                })
                .catch(e => {
                    console.warn(e.message);
                    alert(e.message);
                });
        },
    },
    getters: {
        [VUEX_GETTERS.USERS_COUNT]: state => state.users.length,

        [VUEX_GETTERS.GET_USER_BY_ID]: state => id => {
            return state.users.find(user => user.id === Number(id));
        },

        [VUEX_GETTERS.REPOS_SORT_DIRECTION]: state => state.sorting.repos.direction,
    },
});
