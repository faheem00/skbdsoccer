<template>
	<section>
		<h1 class="text-center">Player List</h1>
		<div class="row mb-5">
			<AuctionDisplayComponent :items="auction_list" :captains="captains_select"></AuctionDisplayComponent>
		</div>
	</section>
</template>

<script>
	import AuctionDisplayComponent from './AuctionDisplayComponent.vue';
	import CaptainDisplayComponent from './CaptainDisplayComponent.vue';
	import Vue from 'vue';
	import VueGoodTable from 'vue-good-table';
	import 'vue-good-table/dist/vue-good-table.css';
	import {
		mapState
	} from 'vuex';
	Vue.use(VueGoodTable);

	export default {
		components: {
			AuctionDisplayComponent,
			CaptainDisplayComponent
		},
		data() {
			return {}
		},		
		methods: {
			groupBy(xs, key) {
				return xs.reduce(function (rv, x) {
					(rv[x[key]] = rv[x[key]] || []).push(x);
					return rv;
				}, {});
			},
		},
		computed: {
			captains_list() {
				//Name, total budget, remaining budget, bought players, remaining players, 
				let total_budget = 200;
				let total_players = 12;
				let grouped_auctioned_players = this.groupBy(this.auction_list, 'team_id');
				return this.teams.map(function (team) {
					let bought_players = 0;
					let remaining_players = 12;
					let remaining_budget = 200;
					if (grouped_auctioned_players.hasOwnProperty(team.id)) {
						let auctioned_player_group = grouped_auctioned_players[team.id];
						bought_players = auctioned_player_group.length;
						if (bought_players > 12) remaining_players = 0;
						else remaining_players = remaining_players - bought_players;
						remaining_budget = remaining_budget - auctioned_player_group.reduce((acc, val) => acc + val.price, 0);
					}
					return {
						team_id: team.id,
						name: team.player.name,
						total_budget: total_budget,
						remaining_budget: remaining_budget,
						bought_players: bought_players,
						remaining_players: remaining_players
					}
				});
			},
			captains_select() {
				return this.teams.map((team) => {
					return {
						text: team.team_name,
						value: team.id
					};
				});
			},
			...mapState({
				auction_list: state => state.player_list.auction_list,
				teams: state => state.player_list.teams,
				websocket: state => state.player_list.websocket,
			})
		}
	}
</script>

<style lang="css">
</style>