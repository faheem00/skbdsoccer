<template>
    <section>
        <h1 class="text-center">Match Results</h1>
        <h6 class="text-center" v-if="results.length > 0">Click over the score to expand match information</h6>
        <div id="accordion" v-if="results.length > 0">
            <div class="card mb-3" v-for="(r, index) in results" :key="r.id">
                <div class="card-header bg-info" :id="'heading-'+index">
                    <button class="btn btn-link btn-block" data-toggle="collapse" :data-target="'#collapse-'+index" aria-expanded="true" :aria-controls="'collapse-'+index">
                        <div class="row text-white">
                            <div class="col-md-4 col-12">{{r.home_team.team_name}}</div>
                            <div class="col-md-4 col-12">
                                {{r.home_team_score}} - {{r.away_team_score}}
                            </div>
                            <div class="col-md-4 col-12"><span class="">{{r.away_team.team_name}}</span></div>
                        </div>
                    </button>
                </div>

                <div :id="'collapse-'+index" class="collapse" :aria-labelledby="'heading-'+index" data-parent="#accordion">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4 col-12">
                                <p class="font-weight-bold">Match Time</p>
                                <p>{{showTime(r.start_time)}}</p>
                                <p class="font-weight-bold">Match Location</p>
                                <p>{{r.location}}</p>
                            </div>
                            <div class="col-md-4 col-12">
                                <p class="font-weight-bold">Match Result</p>
                                <p>{{showResult(r)}}</p>
                                <aside v-if="r.man_of_match">
                                    <p class="font-weight-bold">Man of the Match</p>
                                    <p>&#128081 {{r.man_of_match.name}}</p>
                                </aside>
                            </div>
                            <div class="col-md-4 col-12">
                                <p class="font-weight-bold">Scorers</p>
                                <ul>
                                    <li v-for="g in r.goals" :key="g.id">{{g.player ? g.player.name : 'Own Goal'}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        </div>
        <h6 class="text center" v-else>No match results published yet</h6>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import moment from 'moment';
    export default {
        methods: {
            showTime(date){
                return moment.parseZone(date).format("MMMM Do YYYY h:mm a");
            },
            showResult(result){
                if(result.winner == result.home_team_id)
                    return `${result.home_team.team_name} won the match`;
                else if(result.winner == result.away_team_id)
                    return `${result.away_team.team_name} won the match`;
                else return 'The match was a draw';
            }
        },
        computed: {
            ...mapState({
                results: state => state.result.results
            })
        }
    }
</script>

<style scoped>
    ul{
        list-style:none;
        padding: 0px;
    }
    li:before {
        content: "\26BD";
        margin: 0 1em;
    }
</style>