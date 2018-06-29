import Vue from 'vue';
import App from './main.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueRouter);

import home from './components/home.vue';
import player_list from './components/player_list/player_list.vue';
import fixture from './components/fixture.vue';
import result from './components/result.vue';
const fixtures = {
    template: '<div>foo</div>'
};
const results = {
    template: '<div>foo</div>'
};

const routes = [
    {
        path: '/player_list',
        component: player_list
    },
    {
        path: '/fixtures',
        component: fixture
    },
    {
        path: '/results',
        component: result
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '*',
        redirect: '/home'
    }
];

const router = new VueRouter({routes,linkActiveClass: 'active'});

Vue.config.devtools = process.env.APP_MODE == 'development';

import store from "./store";

new Vue({
    name: 'app',
    el: '#app',
    store,
    render: h => h(App),
    router
});