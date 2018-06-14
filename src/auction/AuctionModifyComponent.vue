<template>
	<div class="row mb-5">
		<div class="col-12">
			<table class="table" v-if="auction_list.length > 0">
				<thead>
					<tr>
						<th scope="col">Name and Position</th>
						<th scope="col">Purchase Price</th>
						<th scope="col">Bought by</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					<AuctionEventDisplay v-for="item in auction_list" :captains="captains" :item="item" @update="AuctionEventUpdate" @delete="AuctionEventDelete"></dAuctionEventDisplayiv>
				</tbody>
			</table>
			<h1 class="text-center" v-else>No players auctioned yet</h1>						
		</div>
		<div class="col-12">
			<div v-if="unsold_players.length == 0">
				<h1 class="text-center">All players have been sold!</h1>
			</div>
			<AuctionEventAdd :unsold_players="unsold_players" :captains="captains" v-else-if="creating" @cancel_event="creating = false" @auction_event_added="AuctionEventCreated" @auction_bidding="auctionBidding"></AuctionEventAdd>			
			<div v-else>
				<button type="button" class="btn btn-outline-primary" @click="creating = true">Add Player</button>
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
	props: ['auction_list','unsold_players','captains'],	
	components: {
		AuctionEventDisplay, AuctionEventAdd
	},
	methods: {
		AuctionEventCreated() {
			this.$emit('update_auction_list');
		},
		AuctionEventUpdate() {
			this.$emit('update_auction_list');
		},
		AuctionEventDelete() {
			this.$emit('update_auction_list');
		},
		auctionBidding(current_bid_amount) {
			this.$emit('auction_bidding',current_bid_amount);
		}
	}	
}
</script>

<style lang="css">
</style>