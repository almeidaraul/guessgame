import * as React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import TeamEditModal from './TeamEditModal.js';

export default function TeamItem(props) {
  const [modal, setModal] = React.useState(false);

  //props.changeColor
  return (
    <View style={{marginBottom: -22}}>
      <TouchableOpacity
        style={props.style}
        onPress={() => setModal(true)}
        onLongPress={props.deleteTeam}
      />
      <TeamEditModal
        changeColor={props.changeColor}
        visible={modal}
        changeModal={setModal}
        colors={props.colors}
        />
    </View>
  );
}
