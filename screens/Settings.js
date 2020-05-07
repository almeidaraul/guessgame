import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Settings extends React.Component() {
	var teams = [];
	const setTeams(value) { teams = value };
	const [teams, setTeams] = React.useState(['#6698ff']);
	const COLORS = [
		'#6698ff',
		'#aa2e25',
		'#a31545',
		'#6d1b7b',
		'#482880',
		'#1769aa',
		'#0276aa',
		'#008394',
		'#00695f',
		'#357a38',
		'#618833',
		'#8f9a27',
		'#b2a429',
		'#b28704',
		'#b26a00',
		'#b23c17',
		];

	const changeColor = (current_color, new_color) => {
		if (teams.length < COLORS.length) {
			var teams_copy = teams.slice();
			teams_copy[teams_copy.indexOf(current_color)] = new_color;
			setTeams(teams_copy);
		}
	}

	const deleteTeam = (color) => {
		var teams_copy = teams.slice();
		teams_copy.splice(teams_copy.indexOf(color), 1);
		setTeams(teams_copy);
	}

	const addTeam = () => {
		var i = 0;
		for (; i < COLORS.length; i++)
			if (teams.indexOf(COLORS[i]) == -1) {
				var teams_copy = teams.slice();
				teams_copy.push(COLORS[i]);
				setTeams(teams_copy);
				break;
			}
	}

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.mainContainer}>
          <Text style={styles.settingsTitle}>Teams</Text>
					<Button title="Clear" onPress={() => setTeams([])} />
					<TouchableOpacity
						style={teamStyle('#909090')}
						onPress={() => addTeam()}
					/>
					<View style={styles.teamList}>
						{teams.map((team) => {
							return (
								<TouchableOpacity
									style={teamStyle(team)}
									onPress={() => changeColor(team, COLORS[Math.floor(Math.random()*10)%COLORS.length])}
									onLongPress={() => deleteTeam(team)}
									id={team}
									/>
						);})}

					</View>

          <Text style={styles.settingsTitle}>Theme</Text>

					<Text style={styles.settingsTitle}>Timer</Text>
        </View>

      </ScrollView>

      <View style={styles.tabBarSaveSettings}>
        <Text style={styles.tabBarInfoText}>Go to game</Text>
      </View>
    </View>
  );
}

Settings.navigationOptions = {
  header: null,
};

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  mainContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  settingsTitle: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 50,
    textAlign: 'center',
  },
  tabBarSaveSettings: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
	teamList: {
		width: '90%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
});
