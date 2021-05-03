import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { apiGetUsersByName } from '@scripts/api-methods';
import { VUEX_MUTATIONS, VUEX_ACTIONS, VUEX_GETTERS } from '@scripts/constants';
import { mapGetUsersByNameResponse } from '@scripts/mappings';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    key: 'store',
});

export const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        users: [],
    },
    mutations: {
        [VUEX_MUTATIONS.SET_USERS](state, users) {
            state.users = users;
        },
    },
    actions: {
        [VUEX_ACTIONS.SEARCH_USERS_BY_NAME]({ commit }, payload) {
            return apiGetUsersByName(payload)
                .then(mapGetUsersByNameResponse)
                .then(result => {
                    console.log(result);
                    commit(VUEX_MUTATIONS.SET_USERS, result.items);
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
    },
});
