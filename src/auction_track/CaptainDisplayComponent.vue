<template>
	<div class="col-6">
			<h2 class="text-center">Captain's Summary</h2>		
			<table class="table table-responsive table-striped">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Total Budget</th>
						<th scope="col">Remaining Budget</th>
						<th scope="col">Bought Players</th>
						<th scope="col">Remaining Quota of Players</th>						
					</tr>
				</thead>
				<tbody>
					<tr v-for="captain in items">
						<td scope="row">{{captain.name}}</td>
						<td scope="row">{{captain.total_budget}}</td>
						<td scope="row">{{captain.remaining_budget}}</td>
						<td scope="row">{{captain.bought_players}}</td>
						<td scope="row">{{captain.remaining_players}}</td>
					</tr>
				</tbody>
			</table>			
		</div>
</template>

<script>
	export default {
		props: ['items']
	}
</script>

<style lang="css">
	
</style>