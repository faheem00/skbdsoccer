<template>
	<div class="col-12">
		<h2 class="text-center">Auctioned Players</h2>
		<div class="row">
			<div class="form-group col-12">
				<label>Filter auctioned players by captain</label>
				<select class="form-control" v-model="team_id">
					<option :value="null">All Players</option>
					<option v-for="captain in captains" :value="captain.value">{{captain.text}}</option>
				</select>
			</div>
		</div>
		<div class="table-responsive" v-if="auctioned_players.length > 0">
			<vue-good-table
			:columns="columns"
			:rows="auctioned_players"
			:search-options="{enabled: true,}"
			:sort-options="{enabled: true,initialSortBy: {field: 'price', type: 'desc'}}"
			:pagination-options="{enabled: true,perPage: 20}"
			styleClass="vgt-table striped bordered"/>
		</div>			
		<h1 class="text-center" v-else>No players auctioned yet</h1>
	</div>
</template>

<script>
	export default {
		props: ['items','captains'],
		data(){
			return {
				team_id: null,
				search: null,
				columns: [
					{label: 'Name',field:'name'},
					{label: 'Position',field:'position'},
					{label: 'Purchase Price',field:'price',type:'number'},
					{label: 'Bought by',field:'captain_name',filterOptions: {enabled: true}},
				]
			}
		},
		methods: {
			player_position (value){
				switch(value){
					case 'gk':
						return 'Goalkeeper';
					case 'def':
						return 'Defender';
					case 'mid':
						return 'Midfielder';
					case 'str':
						return 'Striker';
				}
			}
		},
		computed: {
			auctioned_players(){
				let self = this;
				let search_method = (value => value.player.name.toLowerCase().includes(self.search.toLowerCase()));
				let items;
				if(this.team_id == null)
					items = this.items;
				else items = this.items.filter(item => item.team_id == self.team_id);
				if(this.search != null && this.search != '') items = items.filter(search_method);
				return items.map(item => {
					return {
						name: item.player.name,
						position: self.player_position(item.player.position),
						price: item.price,
						captain_name: item.team.player.name
					};
				});
			}
		}
	}
</script>

<style lang="css">
</style>