import Vue from 'vue';
import { store } from '@scripts/store';
import { router } from '@scripts/router';
import App from '@components/app/app.vue';

export function initApp(containerSelector) {
    const el = document.querySelector(containerSelector);

    if (el === null) {
        return console.error('Контейнер с указанным селектором не найден');
    }

    new Vue({
        el,
        store,
        router,
        render: h => h(App),
    });
}
