import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const player_list = {
    state () {
        return {
            auction_list: [],
            teams: [],
            websocket: null
        }
    },
    mutations: {
        load_auction_list (state,payload) {
            state.auction_list = payload.auction_list;
        },
        load_teams(state, payload) {
            state.teams = payload.teams;
        },
        load_websocket(state, payload) {
            state.websocket = payload.websocket;
        }
    },
    actions: {
        websocket_load_action({state, commit}) {
            if (state.websocket !== null)
                return state.websocket;
            function init_websocket(){
                let hostname = '';
                if (window.location.protocol == 'https:')
                    hostname = "wss://socket.";
                else hostname = "ws://socket.";
                if (window.location.hostname.includes('www.')) {
                    hostname += window.location.hostname.replace('www.', '');
                } else hostname += window.location.hostname;
                let websocket = new WebSocket(hostname);
                websocket.onmessage = function (event) {
                    let split_data = event.data.split('|');
                    if (split_data.length == 2) {
                        let channel = split_data[0];
                        let message = JSON.parse(split_data[1]);
                        switch (channel) {
                            case 'general':
                                iziToast.success({
                                    message: '<h1>The auction event has been updated</h1>',
                                    position: 'bottomLeft',
                                    timeout: 6000
                                });

                                dispatch('data_load_action');
                                break;
                            case 'create':
                                iziToast.success({
                                    message: `<h1>${message.player.name} has been purchased for $${message.price} by ${message.team.player.name}</h1>`,
                                    position: 'center',
                                    timeout: 6000,
                                    overlay: true
                                });
                                
                                dispatch('data_load_action');
                                break;
                            default:
                                break;
                        }
                    }
                };
                websocket.onclose = function () {
                    setTimeout(function () {
                        init_websocket();
                    }, 3000);
                };
                websocket.onerror = function (err) {

                };
                return websocket;
            }
            commit('load_websocket',{websocket: init_websocket()});
        },
        data_load_action({commit}) {
            let self = this;
            //auction events
            fetch('/api/auction_events', {
                credentials: 'same-origin'
            }).then(response => response.json()).then(data => {
                commit('load_auction_list', {
                    auction_list: data.reverse()
                });
            });
            //fetch teams
            fetch('/api/teams', {
                credentials: 'same-origin'
            }).then(response => response.json()).then(data => {
                commit('load_teams', {
                    teams: data
                });
            });
        }
    }
};

const fixture = {
    state: {}
};

const result = {
    state: {}
}

export default new Vuex.Store({
    modules: {
        player_list,
        fixture,
        result
    }
});