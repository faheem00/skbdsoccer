<template>
	<div class="col-12 col-md-6">
		<h2 class="text-center">Auctioned Players</h2>
		<div class="form-group">
			<label>Filter auctioned players by captain</label>
			<select class="form-control" v-model="team_id">
				<option :value="null">All Players</option>
				<option v-for="captain in captains" :value="captain.value">{{captain.text}}</option>
			</select>
		</div>
		<div class="table-responsive" v-if="auctioned_players.length > 0">
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">Name and Position</th>
						<th scope="col">Purchase Price</th>
						<th scope="col">Bought by</th>						
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="item in auctioned_players">
						<td>
							<span>{{item.player.name}} - {{item.player.position | player_position}}</span>			
						</td>
						<td>
							<span>{{item.price}}</span>
						</td>
						<td>
							<span>{{item.team.player.name}}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>			
		<h1 class="text-center" v-else>No players auctioned yet</h1>
	</div>
</template>

<script>
	export default {
		props: ['items','captains'],
		data(){
			return {
				team_id: null
			}
		},
		filters: {
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
				if(this.team_id == null)
					return this.items;
				else return this.items.filter(item => item.team_id == self.team_id);
			}
		}
	}
</script>

<style lang="css">
</style>