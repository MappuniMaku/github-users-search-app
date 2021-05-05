jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { storeConfig } from '@scripts/store';
import { cloneDeep } from 'lodash';
import { DEFAULTS } from '@scripts/constants';
import { fetchOptions } from '@scripts/api-methods';

describe('store.js', () => {
    const query = 'randomstring';

    beforeEach(() => {
        fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({
            total_count: 1000,
            items: [1, 2, 3]
        }))));
    });

    it('fetches async when "searchUsersByName" is dispatched; forms correct url', async () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(storeConfig));
        store.commit('setSearchQuery', query);
        await store.dispatch('searchUsersByName');
        expect(fetch).toHaveBeenCalledTimes(1);
        const expectedUrl = new URL(`https://api.github.com/search/users?q=${query}`
            + `&sort=${store.state.sorting.mode}&order=${store.state.sorting.direction}`
            + `&per_page=${DEFAULTS.USERS_PER_PAGE}&page=${store.state.query.currentPage}`);
        expect(fetch).toHaveBeenCalledWith(expectedUrl, fetchOptions);
    });

    it('sets correct users and totalUsersCount after "searchUsersByName" finished fetching', async () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(storeConfig));
        store.commit('setSearchQuery', query);
        await store.dispatch('searchUsersByName');
        expect(store.state.users.length).toBe(3);
        expect(store.state.totalUsersCount).toBe(1000);
    });
});
