import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Settings() {
	const [teamColors, setTeamColors] = React.useState(['skyblue', 'red', 'red', 'red']);
	const [teams, setTeams] = React.useState([true, false, false, false]);

	const changeColor = (i) => {
		var teamColors_copy = teamColors.slice();
		teamColors_copy[i] = teamColors_copy[i] == 'black' ? 'skyblue' : 'black';
		setTeamColors(teamColors_copy);
	}

	const deleteTeam = (team) => {
		var teams_copy = teams.slice();
		teams_copy[team] = !teams_copy[team];
		setTeams(teams_copy);
	}

	const addTeam = () => {
		var i = 0;
		while (teams[i++]);
		var teams_copy = teams.slice();
		teams_copy[i] = true;
		setTeams(teams_copy);
	}

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.mainContainer}>
          <Text style={styles.settingsTitle}>Teams</Text>
					<View style={styles.teamList}>
						{[0, 1, 2, 3].map((i) => {
								if (teams[i]) return (
									<TouchableOpacity
										style={teamStyle(teamColors[i])}
										onPress={() => changeColor(i)}
										onLongPress={() => deleteTeam(i)}
									/>
									)	
							})
						}
							<TouchableOpacity
								style={teamStyle('#909090')}
								onPress={() => addTeam()}
							/>
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
		width: 80,
		height: 80,
		backgroundColor: color,
		borderRadius: 10,
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
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
		width: '70%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
	},
});
