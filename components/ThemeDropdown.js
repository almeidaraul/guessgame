import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import words from '../assets/themes.js';

export default function ThemeDropdown(props) {
  return (
    <View style={styles.selectDropdown}>
      <Picker
        selectedValue={props.theme}
        onValueChange={(value, index) => props.setTheme(value)}
        itemStyle={styles.dropdownItem}
        >
        {Object.keys(words).map(theme => {
          return <Picker.Item label={theme} value={theme} />
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  selectDropdown: {
    backgroundColor: 'lavender',
    width: '60%',
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownItem: {
    textAlign: 'center',
  },
})
