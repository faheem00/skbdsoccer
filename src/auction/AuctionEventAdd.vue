<template>
	<form class="row">
		<div class="col-3">
			<label>Player</label>
			<select class="form-control" v-model="player_id">
				<option v-for="player in unsold_players_options" :value="player.value">{{player.text}}</option>
			</select>
		</div>
		<div class="col-3">
			<label>Purchase Price</label>
			<priceInputComponent v-model="price" @on_bid="onBid"></priceInputComponent>
		</div>
		<div class="col-3">
			<label>Captain</label>
			<select class="form-control" v-model="team_id">
				<option v-for="option in captain_options" :value="option.value">{{option.text}}</option>
			</select>
		</div>
		<div class="col-3">
			<div class="btn-group" role="group" aria-label="Actions">
				<button type="button" class="btn btn-outline-primary" @click="createAuctionEvent">Save</button>
				<button type="button" class="btn btn-outline-danger" @click="cancelEvent">Cancel</button>
			</div>
		</div>						
	</form>
</template>

<script>
import priceInputComponent from './priceInputComponent.vue';
export default {
	components: {
		priceInputComponent
	},
	props: ['unsold_players','captains'],
	data() {
		return {			
			price: 5,
			player_id: null,
			team_id: null,
			step: 5
		}
	},
	methods: {
		createAuctionEvent(){
			if(this.price != null && this.player_id != null && this.team_id != null){
				let url = '/api/auction_events';
				let self = this;
				swal({
					title:'You are creating an auction player',
					text: "Are you sure you want to confirm this bid?",
					showCancelButton: true,
					showLoaderOnConfirm: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
					preConfirm(){
						return fetch(url,{credentials: 'same-origin',method:'POST',body:JSON.stringify({
							price: self.price,
							player_id: self.player_id,
							team_id: self.team_id
						}),headers:{
						    'Content-Type': 'application/json'
						}}).then(res=>res.json());
					},
					allowOutsideClick: () => !swal.isLoading()
				}).then(data=>{
					if(data.dismiss)
						return;
					if(data.value.errors){
						swal({
			  			  type: 'error',
			  			  title: 'Error',
			  			  html: '<ul>' + data.value.errors.map(v=>`<li>${v}</li>`).join('') +'</ul>'				  			  
			  			});
					}
					else{
						self.$emit('auction_event_added');
						let message = data.value;
				  		Swal('Success!',`${message.player.name} has been purchased for $${message.price} by ${message.team.player.name}`,'success');
					}
				}).finally(()=>{self.player_id = null;self.$emit('auction_bidding',null);});
			}
		},
		cancelEvent() {
			this.price = null;
			this.player_id = null;
			this.team_id = null;
			this.$emit('cancel_event');
			this.$emit('auction_bidding',null);
		},
		onBid() {
			this.$emit('auction_bidding',this.price);
		}
	},
	watch: {
		// price(newval,oldval){			
		// 	if(this.$refs.auction_price){				
		// 		if(newval > 30){					
		// 			if(this.step == 5){						
		// 				this.step = 10;
		// 				if(newval > oldval)
		// 					this.price += 5;
		// 				else this.price -= 5;
		// 			}					
		// 		}
		// 		else if(newval < 30){					
		// 			if(this.step == 10){						
		// 				this.step = 5;	
		// 				if(newval > oldval)
		// 					this.price -= 5;
		// 				else this.price += 5;
		// 			}			
		// 		}
		// 	}
		// 	this.$emit('auction_bidding',this.price);				
		// }
	},
	computed: {
		unsold_players_options() {
			return this.unsold_players.sort((a,b)=>{
				if(a.name < b.name) return -1;
			    if(a.name > b.name) return 1;
			    return 0;
			}).map(player=>{return {text: player.name,value:player.id}});
		},
		captain_options() {
			return this.captains.map(captain => {return {text:captain.name,value:captain.team_id}});
		}
	}
}
</script>

<style lang="css">
</style>