<template>    
    <div class="table-responsive">
        <h1 class="text-center">Match Fixture</h1>
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center">Match Day</th>
                    <th class="text-center">Match Opponents</th>
                    <th class="text-center">Match Start Time</th>
                    <th class="text-center">Match Location</th>
                    <th class="text-center">Result</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="match in matches" :key="match.id">
                    <td>{{showMatchDay(match.start_time)}}</td>
                    <td><span class="font-weight-bold">{{match.home_team.team_name}}</span> VS <span class="font-weight-bold">{{match.away_team.team_name}}</span></td>
                    <td>{{showMatchTime(match.start_time)}}</td>
                    <td>{{match.location}}</td>
                    <td>{{winner(match)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import moment from 'moment';
    export default {
        methods: {
            showMatchDay(date) {                
                return moment.parseZone(date).format("MMMM Do YYYY");
            },
            showMatchTime(date) {
                return moment.parseZone(date).format("h:mm a");
            },
            winner(match) {
                let current_date = moment();
                let match_date = moment.parseZone(match.start_time);                
                if(current_date < match_date)
                    return 'Scheduled';
                else if(match.winner == -1)
                    return 'Not published yet';
                else
                    return `${match.home_team_score} - ${match.away_team_score}`;
            }
        },
        computed: {
            ...mapState({
                matches: state => state.fixture.matches
            })
        }
    }
</script>

<style>
</style>