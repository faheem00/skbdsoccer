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