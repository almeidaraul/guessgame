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

	const [currentWord, setCurrentWord] = React.useState(0);
	const [shuffledWords, setShuffledWords] = React.useState(words[props.theme]);

	const [timerSeconds, setTimerSeconds] = React.useState(props.timer);
	const [timerPaused, setTimerPaused] = React.useState(true);

	//word logic
	React.useEffect(() => { setShuffledWords(shuffle(words[props.theme].slice())) }, []);

	const updateCurrentWord = () => {
		setCurrentWord((currentWord+1)%shuffledWords.length);
	}
	//end word logic

	//timer logic
	React.useEffect(() => {
		!timerPaused && timerSeconds > 0 && setTimeout(() => setTimerSeconds(timerSeconds - 1), 1000);
		console.log(currentWord);
		if (!timerSeconds) { //just got to zero seconds
			updateCurrentWord();
			if (!((current_team+1)%(props.teams.length)))
				incrementRound();
			setCurrentTeam((current_team+1)%(props.teams.length));
			setTimerPaused(true);
			resetTimerSeconds();
		}
  }, [timerSeconds, timerPaused]);

	const resetTimerSeconds = () => { setTimerSeconds(props.timer) }
	
	const flipTimerPaused = () => { setTimerPaused(!timerPaused) }
	
	const timerIsReset = () => { return timerSeconds == props.timer }
	//end timer logic

	const incrementRound = () => { setRound(round+1) }

  const increaseScore = (team) => {
		var score_copy = Object.assign({}, score);
		score_copy[team]++;
		setScore(score_copy);
  }

  const decreaseScore = (team) => {
		var score_copy = Object.assign({}, score);
		score_copy[team]--;
		setScore(score_copy);
  }

  const handlePauseButton = () => {
		flipTimerPaused();
  }

  return (
    <View style={{...styles.mainView, backgroundColor: props.teams[current_team]}}>
      <View style={styles.roundDescription}>
        <Text style={styles.basicTitle}>Round {round}</Text>
        <Text style={styles.currentWord}>
					{
						!timerPaused ? 
							shuffledWords[currentWord]
							: !timerIsReset() ?
								shuffledWords[currentWord]
								: '--'
					}
				</Text>
				<TouchableOpacity onPress={updateCurrentWord}>
					<Text style={styles.wordAdvice}>
						(Skip)
					</Text>
				</TouchableOpacity>
				<Text style={styles.previousWord}>
					Previous: { currentWord ? shuffledWords[currentWord-1] : '--' }
				</Text>
      </View>
      <View style={styles.roundActionsView}>
        <Text style={styles.timer}>{timerSeconds}s</Text>
        <TouchableOpacity onPress={() => handlePauseButton()}>
          <Text style={styles.basicTitle}>
            {(current_team == 0) && timerIsReset() ? 'Start round' : timerPaused ? (timerIsReset() ? 'Start' : 'Continue') : 'Pause'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.teamListView}>
        {props.teams.map((team) => {
          return (
            <View key={team} style={{...styles.teamScore, backgroundColor: team}}>
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
		borderRadius: 15,
		margin: 5,
  },
  roundDescription: {
		marginTop: 25,
    width: '70%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  roundActionsView: {
		marginTop: 20,
    width: '70%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
	basicView: {
    width: '70%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
	teamListView: {
    width: '70%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
		marginTop: 'auto',
		marginBottom: 15,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center',
  },
  currentWord: {
    color: 'white',
    fontSize: 50,
  },
  previousWord: {
    color: 'white',
    fontSize: 15,
  },
	wordAdvice: {
		color: 'white',
		fontSize: 20,
	},
  timer: {
    color: 'white',
    fontSize: 80,
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

/**
 * from https://stackoverflow.com/a/6274381
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

