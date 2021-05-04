import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { apiGetUsersByName } from '@scripts/api-methods';
import {
    VUEX_MUTATIONS,
    SORT_MODES,
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
        query: {
            text: '',
            isLoading: false,
            lastRequestTime: null,
            currentPage: 1,
        },
        sorting: {
            mode: SORT_MODES.REPOS,
            direction: SORT_DIRECTIONS.DESC,
        },
    },
    mutations: {
        setSearchResults(state, result) {
            state.users = result.items;
            state.totalUsersCount = result.totalCount;
            state.query.lastRequestTime = new Date().getTime();
            state.query.currentPage = 1;
        },

        setSearchQuery(state, query) {
            state.query.text = query;
        },

        setReposSortDirection(state, direction) {
            state.sorting.direction = direction;
        },

        addUsers(state, result) {
            state.users.push(...result.items);
            state.totalUsersCount = result.totalCount;
            state.query.lastRequestTime = new Date().getTime();
            state.query.currentPage += 1;
        },

        setQueryInProgress(state, value) {
            state.query.isLoading = value;
        },
    },
    actions: {
        searchUsersByName({ commit, state }) {
            commit(VUEX_MUTATIONS.SET_QUERY_IN_PROGRESS, true);

            return apiGetUsersByName({
                q: state.query.text,
                sort: state.sorting.mode,
                order: state.sorting.direction,
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
                })
                .finally(() => {
                    commit(VUEX_MUTATIONS.SET_QUERY_IN_PROGRESS, false);
                });
        },

        getNextUsersPage({ commit, state }) {
            return apiGetUsersByName({
                q: state.query.text,
                sort: state.sorting.mode,
                order: state.sorting.direction,
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
        usersCount: state => state.users.length,

        getUserById: state => id => {
            return state.users.find(user => user.id === Number(id));
        },

        reposSortDirection: state => state.sorting.direction,

        isQueryMade: state => state.query.lastRequestTime !== null,

        searchQuery: state => state.query.text,

        lastRequestTime: state => state.query.lastRequestTime,

        isQueryInProgress: state => state.query.isLoading,
    },
});
