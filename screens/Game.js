import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Game() {
  const [current_team, setCurrentTeam] = React.useState(0);
  const [round, setRound] = React.useState(1);
  const [score, setScore] = React.useState({});

  //remove this variable once you figure out how to get data from Settings.js
  const props = {
    teams: ['skyblue', 'tomato', 'gold'],
    timer: 50,
    theme: 'Raul',
  };

  () => {
    let score_init = {};
    for (team in props.teams)
      score_init[team] = 0;
    setScore(score_init);
  };

  setInterval(() => setCurrentTeam((current_team+1)%props.teams.length), 1000*props.timer);

  /*TODO: timer
    when timer is going, have a button to pause it
    when timer reaches 0, have a button to start next word
    actually have the timer go from props.timer to 0
  */
  /*TODO: teams
    team list with scores
    manage score
  */
  return (
    <View style={mainViewStyle(props.teams[current_team])}>
      <View style={{...styles.basicView, marginTop: 25}}>
        <Text style={styles.basicTitle}>Round {round}</Text>
        <Text style={{...styles.basicTitle, fontSize: 50}}>PALAVRA</Text>
      </View>
      <View style={{...styles.basicView, marginTop: 20}}>
        <Text style={{...styles.basicTitle, fontSize: 80}}>{90}s</Text>
      </View>
      <View style={styles.basicView}>
        {props.teams.map((team) => {
          return (
            <View style={styles.teamSquare}>
              <Text>{score[team]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const mainViewStyle = (team) => {
  return {
    backgroundColor: team,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  };
}
const styles = StyleSheet.create({
  basicView: {
    width: '70%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  basicTitle: {
    color: 'white',
    fontSize: 30,
  }
})
