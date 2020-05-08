import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function ThemeDropdown(props) {
  return (
    <View style={styles.selectDropdown}>
      <Picker
        selectedValue={props.theme}
        onValueChange={(value, index) => props.setTheme(value)}
        itemStyle={styles.dropdownItem}
        >
        <Picker.Item label="Raul" value="Raul" />
        <Picker.Item label="Moni" value="Moni" />
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
