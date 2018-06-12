<template>  
  <div class="row">    
    <div class="col">
      <AuctionModifyComponent :auction_list="auction_list" @danger_list_update="calculateDangerList" @update_auction_list="getAuctionEvents"/>
    </div>
    <div class="col">
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
    fetch('/api/players').then(response => response.json()).then(data => {
      self.players = data;
    });
    //fetch already auctioned list
    this.getAuctionEvents();
    //fetch teams
    fetch('/api/teams').then(response => response.json()).then(data => {
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
    check_danger (bought_players,remaining_budget){
      let minimum_amount_needed = (12 - bought_players) * 5;
      return remaining_budget < minimum_amount_needed;
    },
    calculateDangerList (current_bid_amount){
      let self = this;
      return this.captains_list.filter(captain => {
        if ((captain.remaining_budget - current_bid_amount) < 0)
          return true;
        else return self.check_danger(captain.bought_players + 1, captain.remaining_budget - current_bid_amount)
      }).map(captain => captain.team_id);
    },
    getAuctionEvents(){
      //fetch already auctioned list
      let self = this;
      fetch('/api/auction_events').then(response => response.json()).then(data => {
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
          remaining_players = remaining_players - bought_players;          
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