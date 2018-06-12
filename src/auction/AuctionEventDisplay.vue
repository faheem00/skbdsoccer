<template>
	<tr>
		<td><span v-if="!modifyState">{{item.player.name}}</span></td>
		<td><span v-if="!modifyState">{{item.price}}</span></td>
		<td><span v-if="!modifyState">{{item.team.player.name}}</span></td>
		<td>
			<div class="btn-group" role="group" aria-label="Actions">
				<button type="button" class="btn btn-info" v-if="modifyState" @click="updateAuctionEvent">Save</button>
				<button type="button" class="btn btn-danger" v-if="modifyState" @click="modifyState = false">Cancel</button>
				<button type="button" class="btn btn-primary" v-if="!modifyState" @click="modifyState = true">Edit</button>
				<button type="button" class="btn btn-danger" v-if="!modifyState" @click="deleteAuctionEvent">Delete</button>			  
			</div>
		</td>
	</tr>
</template>

<script>
export default {
	props: ['item'],
	data (){
		return {
			id: null,
			price: null,
			player_id: null,
			team_id: null,
			modifyState:false
		}
	},
	methods: {
		updateAuctionEvent() {
			if(this.id != null && this.price != null && this.player_id != null && this.team_id != null){
				let url = '/api/auction_events';
				let self = this;
				fetch(url,{method:'PUT',body:JSON.stringify({
					id: self.id,
					price: self.price,
					player_id: self.player_id,
					team_id: self.team_id
				}),headers:{
				    'Content-Type': 'application/json'
				}}).then(res=>res.json()).then(data=>{
					if(data.errors){
						console.log(data.errors);
					}
					else{
						console.log(data);
					}
				});
			}
		},
		deleteAuctionEvent() {
			if(this.id != null){
				let url = '/api/auction_events';
				let self = this;
				fetch(url,{method:'DELETE',body:JSON.stringify({
					id: self.id
				}),headers:{
				    'Content-Type': 'application/json'
				}}).then(res=>res.status).then(status=>console.log(status));
			}
		}
	}
}
</script>

<style lang="css">
</style>
