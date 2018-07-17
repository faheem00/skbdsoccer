import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const home = {
    state() {
        return {
            points_table : []
        }
    },
    mutations: {
        load_points_table(state,payload) {
            state.points_table = payload.points_table;
        }
    },
    actions: {
        points_table_load_action({commit}) {
            fetch('/api/points_table', {
                credentials: 'same-origin'
            }).then(response => response.json()).then(data => {
                commit('load_points_table',{points_table:data});
            });
        }
    }
}

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
            //auction events
            fetch('/api/players', {
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
    state() {
        return {
            matches: []
        }
    },
    mutations: {
        load_matches (state, payload){
            state.matches = payload.matches;
        }
    },
    actions: {
        matches_load_action({commit}){
            fetch('/api/matches', {
                credentials: 'same-origin'
            }).then(response => response.json()).then(data => {
                commit('load_matches', {
                    matches: data
                });
            });
        }
    }
};

const result = {
    state() {
        return {
            results: []
        }
    },
    mutations: {
        load_results (state,payload) {
            state.results = payload.results;
        }
    },
    actions: {
        results_load_action({commit}){
            fetch('/api/results', {
                credentials: 'same-origin'
            }).then(response => response.json()).then(data => {
                commit('load_results', {
                    results: data
                });
            });
        }
    }
}

export default new Vuex.Store({
    modules: {
        home,
        player_list,
        fixture,
        result
    }
});