<template>
	<div class="row">
		<div class="col-12">
			<table class="table" v-if="auction_list.length > 0">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Purchase Price</th>
						<th scope="col">Bought by</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					<AuctionEventDisplay v-for="item in auction_list" :item="item" @update="AuctionEventUpdate" @delete="AuctionEventDelete"></dAuctionEventDisplayiv>
				</tbody>
			</table>
			<h1 class="text-center" v-else>No players auctioned yet</h1>						
		</div>
		<div class="col-12">
			<AuctionEventAdd v-if="creating"></AuctionEventAdd>
			<div v-else>
				<button type="button" class="btn btn-outline-primary">Add Player</button>
			</div>
		</div>
	</div>
</template>

<script>
import AuctionEventDisplay from './AuctionEventDisplay.vue';
import AuctionEventAdd from './AuctionEventAdd.vue';

export default {
	data () {
		return {
			msg: 'This is the auction modify component',			
			creating: false
		}
	},
	props: ['auction_list'],	
	components: {
		AuctionEventDisplay, AuctionEventAdd
	},
	methods: {
		AuctionEventUpdate() {
			this.$emit('update_auction_list');
		},
		AuctionEventDelete() {
			this.$emit('update_auction_list');
		}
	}	
}
</script>

<style lang="css">
</style>