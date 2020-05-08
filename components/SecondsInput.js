import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
  Text,
} from 'react-native';
import NumericInput from 'react-native-numeric-input'

export default function SecondsInput(props) {
  const [modal_visible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.centeredView}>
      <NumericInput
        value={props.seconds}
        onChange={value => props.setSeconds(correctValue(value))}
        totalWidth={150}
        totalHeight={50}
        iconSize={25}
        step={10}
        rounded
        textColor='#B0228C'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#2e8b57'
        leftButtonBackgroundColor='#ff0000'/>
    </View>
  )
}

const correctValue = (value) => {
  if (value < 10) return 10;
  else if (value > 90) return 90;
  else return value;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
