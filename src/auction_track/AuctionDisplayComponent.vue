<template>
	<div class="col-6">
		<h2 class="text-center">Auctioned Players</h2>	
		<table class="table table-striped" v-if="items.length > 0">
			<thead>
				<tr>
					<th scope="col">Name and Position</th>
					<th scope="col">Purchase Price</th>
					<th scope="col">Bought by</th>						
				</tr>
			</thead>
			<tbody>
				<tr scope="row" v-for="item in items">
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
		<h1 class="text-center" v-else>No players auctioned yet</h1>
	</div>
</template>

<script>
	export default {
		props: ['items'],
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
		}
	}
</script>

<style lang="css">
</style>