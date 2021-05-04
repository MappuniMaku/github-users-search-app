import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SearchPanel from '@components/search-panel/search-panel.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('search-panel.vue', () => {
    let mutations, getters, store;

    beforeEach(() => {
        mutations = {
            setSearchQuery: jest.fn(),
        };

        getters = {
            searchQuery: () => 'initial',
            isQueryInProgress: () => false,
        };

        store = new Vuex.Store({
            mutations,
            getters,
        });
    });

    it('commits "setSearchQuery" on button click when query is not empty and is different from store searchQuery', async () => {
        const wrapper = mount(SearchPanel, { store, localVue });
        const input = wrapper.find('input');
        input.element.value = 'randomstring';
        await input.trigger('input');
        const button = wrapper.find('button');
        button.trigger('click');
        expect(mutations.setSearchQuery).toHaveBeenCalled();
    });

    it('does not commit "setSearchQuery" on button click when query is empty', async () => {
        const wrapper = mount(SearchPanel, { store, localVue });
        const input = wrapper.find('input');
        input.element.value = '';
        await input.trigger('input');
        const button = wrapper.find('button');
        button.trigger('click');
        expect(mutations.setSearchQuery).not.toHaveBeenCalled();
    });

    it('does not commit "setSearchQuery" on button click when query is same as store searchQuery', async () => {
        const wrapper = mount(SearchPanel, { store, localVue });
        const input = wrapper.find('input');
        input.element.value = 'initial';
        await input.trigger('input');
        const button = wrapper.find('button');
        button.trigger('click');
        expect(mutations.setSearchQuery).not.toHaveBeenCalled();
    });

    it('commits "setSearchQuery" on input keypress enter when query is not empty and is different from store searchQuery', async () => {
        const wrapper = mount(SearchPanel, { store, localVue });
        const input = wrapper.find('input');
        input.element.value = 'randomstring';
        await input.trigger('input');
        await input.trigger('keypress.enter');
        expect(mutations.setSearchQuery).toHaveBeenCalled();
    });

    it('does not commit "setSearchQuery" on input keypress enter when query is empty', async () => {
        const wrapper = mount(SearchPanel, { store, localVue });
        const input = wrapper.find('input');
        input.element.value = '';
        await input.trigger('input');
        await input.trigger('keypress.enter');
        expect(mutations.setSearchQuery).not.toHaveBeenCalled();
    });

    it('does not commit "setSearchQuery" on input keypress enter when query is same as store searchQuery', async () => {
        const wrapper = mount(SearchPanel, { store, localVue });
        const input = wrapper.find('input');
        input.element.value = 'initial';
        await input.trigger('input');
        await input.trigger('keypress.enter');
        expect(mutations.setSearchQuery).not.toHaveBeenCalled();
    });
});
