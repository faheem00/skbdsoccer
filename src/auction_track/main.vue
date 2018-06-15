<template>
	<section>
		<h1 class="text-center">Welcome to Auction Central!</h1>
		<div class="row mb-5">
			<AuctionDisplayComponent :items="auction_list" :captains="captains_select"></AuctionDisplayComponent>			
		</div>		
	</section>
</template>

<script>
	import AuctionDisplayComponent from './AuctionDisplayComponent.vue';
	import CaptainDisplayComponent from './CaptainDisplayComponent.vue';
	export default {
		components: {
			AuctionDisplayComponent,CaptainDisplayComponent
		},
		data() {
			return {
				auction_list: [],
				teams: [],
				websocket: null
			}
		},
		created () {
    		let self = this;
    		this.loadData();
    		let hostname = '';
    		if(window.location.protocol == 'https:')
    			hostname = "wss://socket.";
    		else hostname = "ws://socket.";
    		if(window.location.hostname.includes('www.')){
    			hostname += window.location.hostname.replace('www.','');
    		} else hostname += window.location.hostname;
    		this.loadWebsocket(hostname);  		
    	},
    	methods: {
    		loadData() {
    			let self = this;
    			//auction events
    			fetch('/api/auction_events',{credentials: 'same-origin'}).then(response => response.json()).then(data => {
    			  self.auction_list = data.reverse();
    			});
    			//fetch teams
    			fetch('/api/teams',{credentials: 'same-origin'}).then(response => response.json()).then(data => {
    			  self.teams = data;
    			});
    		},
    		groupBy (xs, key) {
    		  return xs.reduce(function(rv, x) {
    		    (rv[x[key]] = rv[x[key]] || []).push(x);
    		    return rv;
    		  }, {});
    		},
    		loadWebsocket(hostname) {
    			let self = this;
	    		this.websocket = new WebSocket(hostname);
	    		this.websocket.onmessage = function(event){    			
	    			let split_data = event.data.split('|');
	    			if(split_data.length == 2){
		    			let channel = split_data[0];
		    			let message = JSON.parse(split_data[1]);		    			
		    			switch(channel){
		    				case 'general':
		    					iziToast.success({		    						  					    
		    					    message: '<h1>The auction event has been updated</h1>',    						
		    						position: 'bottomLeft',
		    						timeout: 6000
		    					});

		    					self.loadData();
		    					break;
		    				case 'create':		    					
								iziToast.success({    													    
		    					    message: `<h1>${message.player.name} has been purchased for $${message.price} by ${message.team.player.name}</h1>`,			
		    						position: 'center',
		    						timeout: 6000,
		    						overlay: true
		    					});    					
		    					self.loadData();
		    					break;
		    				default:
		    				break;
		    			}
	    			}  			
	    		};
	    		this.websocket.onclose = function(){
	    			setTimeout(function(){self.loadWebsocket(hostname)}, 3000);
	    		}
	    		this.websocket.onerror = function(err){
	    			
	    		}
    		}
    	},
    	computed: {
    	  captains_list () {
    	    //Name, total budget, remaining budget, bought players, remaining players, 
    	    let total_budget = 200;
    	    let total_players = 12;
    	    let grouped_auctioned_players = this.groupBy(this.auction_list,'team_id');      
    	    return this.teams.map(function(team){
    	      let bought_players = 0;
    	      let remaining_players = 12;
    	      let remaining_budget = 200;
    	      if(grouped_auctioned_players.hasOwnProperty(team.id)){
    	        let auctioned_player_group = grouped_auctioned_players[team.id];
    	        bought_players = auctioned_player_group.length;
    	        if(bought_players > 12) remaining_players = 0;
    	        else remaining_players = remaining_players - bought_players;          
    	        remaining_budget = remaining_budget - auctioned_player_group.reduce((acc,val) => acc + val.price,0);
    	      }
    	      return {
    	        team_id: team.id,
    	        name: team.player.name,
    	        total_budget: total_budget,
    	        remaining_budget: remaining_budget,
    	        bought_players: bought_players,
    	        remaining_players: remaining_players
    	      }        
    	    });
    	  },
          captains_select() {
            return this.teams.map((team) => {
                return {text: team.player.name, value: team.id};
            });
          }
    	}
	}
</script>

<style lang="css">
</style>