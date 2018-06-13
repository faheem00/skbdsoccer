<template>  
  <div class="row">    
    <div class="col-7">
      <AuctionModifyComponent :auction_list="auction_list" :unsold_players="unsold_player_list" :captains="captains_list" @danger_list_update="calculateDangerList" @update_auction_list="getAuctionEvents" @auction_bidding="calculateDangerList"/>
    </div>
    <div class="col-5">
      <AuctionDisplayComponent :captains="captains_list" :danger_list="danger_list"/>
    </div>
  </div>
</template>

<script>
import AuctionDisplayComponent from './AuctionDisplayComponent.vue';
import AuctionModifyComponent from './AuctionModifyComponent.vue';

export default {
  created () {
    let self = this;
    //fetch player list    
    fetch('/api/players',{credentials: 'same-origin'}).then(response => response.json()).then(data => {
      self.players = data;
    });
    //fetch already auctioned list
    this.getAuctionEvents();
    //fetch teams
    fetch('/api/teams',{credentials: 'same-origin'}).then(response => response.json()).then(data => {
      self.teams = data;
    });
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App!',
      players: [],
      auction_list: [],
      teams: [],
      danger_list: []
    }
  },
  methods: {
    groupBy (xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
    check_danger (bought_players,future_remaining_budget){
      let minimum_amount_needed = null;
      if((bought_players+ 1) > 12){
        //captain is trying to buy more than minimum required players
        minimum_amount_needed = 0;
      } else{
        minimum_amount_needed = (12 - (bought_players+ 1)) * 5;
      }
      return future_remaining_budget < minimum_amount_needed;
    },
    calculateDangerList (current_bid_amount){
      let self = this;
      if(current_bid_amount != null){
        this.danger_list = this.captains_list.filter(captain => {
          if ((captain.remaining_budget - current_bid_amount) < 0)
            return true;
          else return self.check_danger(captain.bought_players, captain.remaining_budget - current_bid_amount)
        }).map(captain => captain.team_id);
      } else this.danger_list = [];  
    },
    getAuctionEvents(){
      //fetch already auctioned list
      let self = this;
      fetch('/api/auction_events',{credentials: 'same-origin'}).then(response => response.json()).then(data => {
        self.auction_list = data;
      });  
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
    unsold_player_list() {         
      if(this.auction_list.length > 0){
        let auctioned_player_id_list = this.auction_list.map(al => al.player_id);        
        return this.players.filter(player=> auctioned_player_id_list.indexOf(player.id) == -1);
      } else return this.players;
    }
  },
  components: {
    AuctionDisplayComponent,AuctionModifyComponent
  }
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  }
</style>