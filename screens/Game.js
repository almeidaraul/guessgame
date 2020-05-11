import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import words from '../assets/themes.js'

export default function Game({ route }) {
  const props = {
    teams: route.params.teams,
    timer: route.params.timer,
    theme: route.params.theme,
  };
  const start_index = Math.floor(Math.random()*100)%words[props.theme].length;

  const [current_team, setCurrentTeam] = React.useState(0);
  const [round, setRound] = React.useState(1);
  const [score, setScore] = React.useState(scoreInit(props.teams));
  const [timer, setTimer] = React.useState(props.timer);
  const [paused_timer, setPausedTimer] = React.useState(true);
  const [available_words, setAvailableWords] = React.useState(words[props.theme].slice().splice(start_index, 1));
  const [current_word, setCurrentWord] = React.useState(words[props.theme][start_index].slice());


  const increaseScore = (team) => {
    if (paused_timer) {
      var score_copy = Object.assign({}, score);
      score_copy[team]++;
      setScore(score_copy);
    }
  }

  const decreaseScore = (team) => {
    if (paused_timer) {
      var score_copy = Object.assign({}, score);
      score_copy[team]--;
      setScore(score_copy);
    }
  }

  const handlePauseButton = () => {
    if (paused_timer && (timer == 0)) {
      setTimer(props.timer);
      if (available_words.length) {
        const i = Math.floor(Math.random()*100)%available_words.length;
        setCurrentWord(available_words[i].slice());
        setAvailableWords(available_words.splice(i, 1));
      } else {
        setCurrentWord("No more words");
      }
    }
    setPausedTimer(!paused_timer);
  }

  const updateTimer = () => {
    if (!paused_timer)
      setTimer(timer-1);
    if (timer == 0)
      setPausedTimer(true);
  }
  setInterval(() => updateTimer(), 1000);

  /*TODO: timer
    when timer is going, have a button to pause it
    when timer reaches 0, have a button to start next word
    actually have the timer go from props.timer to 0
  */
  return (
    <View style={{...styles.mainView, backgroundColor: props.teams[current_team]}}>
      <View style={{...styles.basicView, marginTop: 25}}>
        <Text style={styles.basicTitle}>Round {round}</Text>
        <Text style={{...styles.basicTitle, fontSize: 50}}>{current_word}</Text>
      </View>
      <View style={{...styles.basicView, marginTop: 20}}>
        <Text style={{...styles.basicTitle, fontSize: 80}}>{timer}s</Text>
        <TouchableOpacity style={styles.button} onPress={() => handlePauseButton()}>
          <Text style={{...styles.basicTitle, fontSize: 30}}>
            {(current_team == 0) && (timer == props.timer) ? 'Start round' : paused_timer ? 'Continue' : 'Pause'}
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
