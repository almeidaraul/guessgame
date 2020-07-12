import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import words from '../assets/themes.js'

export default function Game({ route }) {
  const props = {
    teams: route.params.teams,
    timer: route.params.timer,
    theme: route.params.theme,
  };
  const [current_team, setCurrentTeam] = React.useState(0);
  const [round, setRound] = React.useState(1);
  const [score, setScore] = React.useState(scoreInit(props.teams));


  const increaseScore = (team) => {
    //if (paused_timer) {
      var score_copy = Object.assign({}, score);
      score_copy[team]++;
      setScore(score_copy);
  }

  const decreaseScore = (team) => {
    //if (paused_timer) {
      var score_copy = Object.assign({}, score);
      score_copy[team]--;
      setScore(score_copy);
  }

  const handlePauseButton = () => {
  }

  return (
    <View style={{...styles.mainView, backgroundColor: props.teams[current_team]}}>
      <View style={{...styles.basicView, marginTop: 25}}>
        <Text style={styles.basicTitle}>Round {round}</Text>
        <Text style={{...styles.basicTitle, fontSize: 50}}>word</Text>
      </View>
      <View style={{...styles.basicView, marginTop: 20}}>
        <Text style={{...styles.basicTitle, fontSize: 80}}>{80}s</Text>
        <TouchableOpacity style={styles.button} onPress={() => handlePauseButton()}>
          <Text style={{...styles.basicTitle, fontSize: 30}}>
            {/*(current_team == 0) && (timer == props.timer) ? 'Start round' : paused_timer ? 'Continue' : 'Pause'*/}
						Start round
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.basicView, marginTop: 'auto', marginBottom: 15, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
        {props.teams.map((team) => {
          return (
            <View key={team} style={{...styles.teamScore, borderRadius: 15, backgroundColor: team, margin: 5}}>
              <TouchableOpacity
                onPress={() => increaseScore(team)}
                onLongPress={() => decreaseScore(team)}
                >
                <Text style={styles.teamScoreText}>
                  {score[team]}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const scoreInit = (teams) => {
  var score_init = {};
  teams.map((team) => {score_init[team] = 0});
  return score_init;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  teamScore: {
    width: 50,
    height: 50,
  },
  basicView: {
    width: '70%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  basicTitle: {
    color: 'white',
    fontSize: 30,
  },
  teamScoreText: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {'width': 0, 'height': 0},
    textShadowRadius: 5,
    fontSize: 32,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
})
