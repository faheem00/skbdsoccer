<template>
	<div class="col-12">		
		<div class="row">
			<div class="form-group col-12">
				<label>Filter players by team name</label>
				<select class="form-control" v-model="team_id">
					<option :value="null">All Teams</option>
					<option v-for="captain in captains" :key="captain.value" :value="captain.value">{{captain.text}}</option>
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
		<h1 class="text-center" v-else>No players in team yet</h1>
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
				let search_method = (value => value.name.toLowerCase().includes(self.search.toLowerCase()));
				let items;
				if(this.team_id == null)
					items = this.items;
				else items = this.items.filter(item => item.team_id == self.team_id);
				if(this.search != null && this.search != '') items = items.filter(search_method);
				return items.map(item => {
					return {
						name: item.name,
						position: self.player_position(item.position),
						price: item.auction_event ? item.auction_event.price : 0
					};
				});
			}
		}
	}
</script>

<style lang="css">
</style>