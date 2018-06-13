<template>
	<div class="row">
		<div class="col-12">
			<div class="row position-fixed">
				<table class="table table-responsive">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Total Budget</th>
							<th scope="col">Remaining Budget</th>
							<th scope="col">Bought Players</th>
							<th scope="col">Remaining Players</th>						
						</tr>
					</thead>
					<tbody>
						<tr v-for="captain in captains" :class="{danger: danger_list.indexOf(captain.team_id) > -1}">
							<td scope="row">{{captain.name}}</td>
							<td scope="row">{{captain.total_budget}}</td>
							<td scope="row">{{captain.remaining_budget}}</td>
							<td scope="row">{{captain.bought_players}}</td>
							<td scope="row">{{captain.remaining_players}}</td>
						</tr>
					</tbody>
				</table>
			</div>			
		</div>
	</div>
</template>

<script>
export default {
	data () {
	    return {
	      msg: 'This is the auction display component'
	    }
	},
	props: ['captains','danger_list']
}
</script>

<style lang="css">
.danger{
	background: red;
	color: white;
}
</style>