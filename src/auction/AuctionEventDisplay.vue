<template>
	<tr>
		<td>
			<span>{{item.player.name}}</span>			
		</td>
		<td>
			<span v-if="!modifyState">{{item.price}}</span>
			<div class="form-group" v-else>
				<priceInputComponent v-model="price"></priceInputComponent>
			</div>
		</td>
		<td>
			<span v-if="!modifyState">{{item.team.player.name}}</span>
			<div class="form-group" v-else>
				<select class="form-control" v-model="team_id">
					<option v-for="option in captain_options" :value="option.value">{{option.text}}</option>
				</select>
			</div>
		</td>
		<td>
			<div class="btn-group" role="group" aria-label="Actions">
				<button type="button" class="btn btn-info" v-if="modifyState" @click="updateAuctionEvent">Save</button>
				<button type="button" class="btn btn-danger" v-if="modifyState" @click="cancelEvent">Cancel</button>
				<button type="button" class="btn btn-primary" v-if="!modifyState" @click="modifyState = true">Edit</button>
				<button type="button" class="btn btn-danger" v-if="!modifyState" @click="deleteAuctionEvent">Delete</button>			  
			</div>
		</td>
	</tr>
</template>

<script>
import priceInputComponent from './priceInputComponent.vue';

export default {
	components: {
		priceInputComponent
	},
	props: ['item','captains'],
	data (){
		return {
			id: null,
			price: null,
			player_id: null,
			team_id: null,
			modifyState:false,
			step:5
		}
	},
	mounted(){		
		this.id = this.item.id;
		this.price = this.item.price;
		this.player_id = this.item.player_id;
		this.team_id = this.item.team_id;
	},
	methods: {
		updateAuctionEvent() {
			if(this.id != null && this.price != null && this.player_id != null && this.team_id != null){
				let url = '/api/auction_events';
				let self = this;
				swal({
					title:'You are editing an auction player',
					text: 'Are you sure you want to edit this auction event?',
					showCancelButton: true,
					showLoaderOnConfirm: true,
					preConfirm(){
						return fetch(url,{credentials: 'same-origin',method:'PUT',body:JSON.stringify({
							id: self.id,
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
						self.$emit('update');
				  		Swal('Success!','Player auction successfully edited!','success');
					}
				}).finally(() => self.modifyState = false);				
			}
		},
		deleteAuctionEvent() {
			if(this.id != null){
				let url = '/api/auction_events';
				let self = this;
				swal({
					title:'You are deleting an auction player',
					text: 'Are you sure you want to delete this auction event?',
					showCancelButton: true,
					showLoaderOnConfirm: true,
					preConfirm(){
						return fetch(url,{credentials: 'same-origin',method:'DELETE',body:JSON.stringify({
							id: self.id
						}),headers:{
						    'Content-Type': 'application/json'
						}}).then(res=>res.status);
					},
					allowOutsideClick: () => !swal.isLoading()
				}).then(data=>{
					if(data.dismiss)
						return;
					if(data.value != 200){
						swal({
			  			  type: 'error',
			  			  title: 'Error',
			  			  html: 'There was a problem deleting the auction event, please try again or contact administrator'				  			  
			  			});
					}
					else{
						self.$emit('update');
				  		Swal('Success!','Player auction successfully deleted!','success');
					}
				}).finally(() => self.modifyState = false);	
			}
		},
		cancelEvent() {
			this.modifyState = false;
			this.team_id = this.item.team_id;
			this.price = this.item.price;
		}			
	},
	computed: {
		captain_options() {
			return this.captains.map(captain => {return {text:captain.name,value:captain.team_id}});
		}
	}
}
</script>

<style lang="css">
</style>
