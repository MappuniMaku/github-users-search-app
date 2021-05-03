import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { apiGetUsersByName } from '@scripts/api-methods';
import {
    VUEX_MUTATIONS,
    VUEX_ACTIONS,
    VUEX_GETTERS,
    SORT_DIRECTIONS,
    MESSAGES,
} from '@scripts/constants';
import { mapGetUsersByNameResponse } from '@scripts/mappings';

Vue.use(Vuex);

const USERS_PER_PAGE = 30;

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
        lastQueryTime: null,
        currentPage: 1,
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
            state.lastQueryTime = new Date().getTime();
            state.currentPage = 1;
        },

        [VUEX_MUTATIONS.SET_SEARCH_QUERY](state, query) {
            state.searchQuery = query;
        },

        [VUEX_MUTATIONS.SET_REPOS_SORT_DIRECTION](state, direction) {
            state.sorting.repos.direction = direction;
        },

        [VUEX_MUTATIONS.ADD_USERS](state, result) {
            state.users.push(...result.items);
            state.totalUsersCount = result.totalCount;
            state.isQueryMade = true;
            state.lastQueryTime = new Date().getTime();
            state.currentPage += 1;
        },
    },
    actions: {
        [VUEX_ACTIONS.SEARCH_USERS_BY_NAME]({ commit, state }) {
            return apiGetUsersByName({
                q: state.searchQuery,
                sort: 'repositories',
                order: state.sorting.repos.direction,
                per_page: USERS_PER_PAGE,
                page: 1,
            })
                .then(mapGetUsersByNameResponse)
                .then(result => {
                    console.log(result);
                    commit(VUEX_MUTATIONS.SET_SEARCH_RESULTS, result);
                })
                .catch(e => {
                    console.warn(e.message);
                    alert(MESSAGES.API_ERROR);
                });
        },

        [VUEX_ACTIONS.GET_NEXT_USERS_PAGE]({ commit, state }) {
            return apiGetUsersByName({
                q: state.searchQuery,
                sort: 'repositories',
                order: state.sorting.repos.direction,
                per_page: USERS_PER_PAGE,
                page: state.currentPage + 1,
            })
                .then(mapGetUsersByNameResponse)
                .then((result) => {
                    console.log(result);
                    commit(VUEX_MUTATIONS.ADD_USERS, result);
                })
                .catch(e => {
                    console.warn(e.message);
                    alert(MESSAGES.API_ERROR);
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
