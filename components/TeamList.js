import * as React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TeamItem from './TeamItem.js';

export default function TeamList(props) {
  const changeColor = (current_color, new_color) => {
  	if ((props.teams.length < COLORS.length) && (props.teams.indexOf(new_color) == -1)) {
  		var teams_copy = props.teams.slice();
  		teams_copy[teams_copy.indexOf(current_color)] = new_color;
  		setTeams(teams_copy);
  	}
  }

  const deleteTeam = (color) => {
  	var teams_copy = props.teams.slice();
  	teams_copy.splice(teams_copy.indexOf(color), 1);
  	setTeams(teams_copy);
  }

  const addTeam = () => {
  	var i = 0;
  	for (; i < COLORS.length; i++)
  		if (props.teams.indexOf(COLORS[i]) == -1) {
  			var teams_copy = props.teams.slice();
  			teams_copy.push(COLORS[i]);
  			setTeams(teams_copy);
  			break;
  		}
  }

  const setTeams = (value) => {
    props.setTeams(value);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTeams([])}
          >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addTeam()}
          >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    	<View style={styles.teamList}>
    		{props.teams.map((team) => {
    			return (
    				<TeamItem
              style={teamStyle(team)}
    					changeColor={(color) => changeColor(team, color)}
    					deleteTeam={() => deleteTeam(team)}
    					key={team}
              colors={COLORS}
    					/>
    		);})}

    	</View>
    </View>
  );
}

const teamStyle = (color) => {
	return {
		width: 50,
		height: 50,
		backgroundColor: color,
		borderRadius: 10,
		margin: 2.5,
	}
}

const styles = StyleSheet.create({
	teamList: {
		width: '90%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 15,
  },
  button: {
    margin: 5,
    backgroundColor: 'cornflowerblue',
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    lineHeight: 15,
    fontSize: 15,
    margin: 10,
  },
  buttonsContainer: {
    width: '60%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
})

const COLORS = [
  'skyblue',
  'forestgreen',
  'gold',
  'hotpink',
  'indigo',
  'rebeccapurple',
  'springgreen',
  'goldenrod',
	];
