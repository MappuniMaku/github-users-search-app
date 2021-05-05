import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UserPage from '@components/user-page/user-page.vue';
import { MESSAGES } from '@scripts/constants';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('user-page.vue', () => {
    const users = [{
        id: 123,
        name: 'username',
    }];
    let getters, store;

    beforeEach(() => {
        getters = {
            getUserById: () => (id) => users.find(item => item.id === id),
        };

        store = new Vuex.Store({
            getters,
        });
    });

    it('renders user name into h1 if user is found', () => {
        const $route = {
            params: { id: 123 },
        };

        const wrapper = mount(UserPage, { store, localVue, stubs: ['router-link'], mocks: { $route } });
        const heading = wrapper.find('h1');
        expect(heading.text()).toBe((getters.getUserById())($route.params.id).name);
    });

    it('renders error message in span if user is not found', () => {
        const $route = {
            params: { id: 999 },
        };

        const wrapper = mount(UserPage, { store, localVue, stubs: ['router-link'], mocks: { $route } });
        const heading = wrapper.find('span');
        expect(heading.text()).toBe(MESSAGES.ERROR_USER_NOT_FOUND);
    });
});
