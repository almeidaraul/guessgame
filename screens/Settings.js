import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TeamList from '../components/TeamList.js';
import ThemeDropdown from '../components/ThemeDropdown.js'
import SecondsInput from '../components/SecondsInput.js';

export default function Settings() {
	const [teams, setTeams] = React.useState(['skyblue']);
	const [theme, setTheme] = React.useState("Raul");
	const [seconds, setSeconds] = React.useState(60);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.mainContainer}>
		      <Text style={styles.settingsTitle}>Teams</Text>
						<Text>Note that team colors should be unique.</Text>
						<TeamList teams={teams} setTeams={setTeams} />
          <Text style={styles.settingsTitle}>Theme</Text>
						<ThemeDropdown theme={theme} setTheme={setTheme}/>
					<Text style={styles.settingsTitle}>Timer</Text>
						<SecondsInput seconds={seconds} setSeconds={setSeconds}/>
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
});
