<template>
	
</template>

<script>
export default {
	data() {
		return {			
			price: null,
			player_id: null,
			team_id: null
		}
	},
	methods: {
		createAuctionEvent(){
			if(this.price != null && this.player_id != null && this.team_id != null){
				let url = '/api/auction_events';
				let self = this;
				fetch(url,{method:'POST',body:JSON.stringify({
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
		}
	}
}
</script>

<style lang="css">
</style>