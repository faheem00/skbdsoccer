<template>
    <div class="row">
        <div class="col-md-8 col-12">
            <h1 class="text-center">Tournament Information</h1>
            <h3>Starts on July 4th</h3>
            <h3>5 teams playing against each other once</h3>
            <h3>Top 2 teams play the final</h3>
            <br>
            <h1>Points Table</h1>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text-center">Position</th>                            
                            <th class="text-center">Team Name</th>
                            <th class="text-center">Matches Played</th>
                            <th class="text-center">Matches Won</th>
                            <th class="text-center">Matches Lost</th>
                            <th class="text-center">Matches Drawn</th>
                            <th class="text-center">Goals For</th>
                            <th class="text-center">Goals Against</th>
                            <th class="text-center">Goal Difference</th>
                            <th class="text-center">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(team, index) in points_table" :key="team.team_name">
                            <td>{{index + 1}}</td>                            
                            <td>{{team.team_name}}</td>
                            <td>{{Number(team.win_count) + Number(team.lose_count) + Number(team.draw_count)}}</td>
                            <td>{{team.win_count}}</td>
                            <td>{{team.lose_count}}</td>
                            <td>{{team.draw_count}}</td>
                            <td>{{team.goals_for}}</td>
                            <td>{{team.goals_against}}</td>
                            <td>{{team.goal_difference}}</td>
                            <td>{{team.points}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1>Top Goal Scorers</h1>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text-center">Goal Count</th>                            
                            <th class="text-center">Player Name</th>
                        <tr/>
                    </thead>
                    <tbody>
                        <tr v-for="(goal, index) in goal_scorers" :key="index">
                            <td class="text-center">{{goal.goals}}</td>
                            <td class="text-center">{{goal.player.name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-md-4 d-none d-sm-block">
            <img class="img-fluid" :src="'/images/poster.jpg'" />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueGoodTable from 'vue-good-table';
    import 'vue-good-table/dist/vue-good-table.css';
    import {mapState} from 'vuex';
    Vue.use(VueGoodTable);
    export default {        
        computed: {
            ...mapState({
                points_table: state => state.home.points_table,
                goal_scorers: state => state.home.goal_scorers
            })
        }
    }
</script>

<style>
</style>