import Vue from 'vue/dist/vue.esm';
import Item from './item.vue';

console.log('dsada');

const app = new Vue({
    el: '[data-app]',
    components: {
        Item,
    },
    data: {
        message: 'Hello Vue!',
        items: [
            {
                text: 'fdsda',
            },
            {
                text: 'ggre',
            },
        ],
    }
});
