import * as React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

export default function TeamEditModal(props) {

  const changeColor = (color) => {
      props.changeColor(color);
      props.changeModal(false);
  }

  return (
  <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pick team color</Text>
            <View style={styles.colorList}>
              {props.colors.map((color) => {
                return (
                  <TouchableOpacity
                    style={colorBlock(color)}
                    onPress={() => changeColor(color)}
                    key={color}
                    />
                );
              })}
            </View>

            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => props.changeModal(false) }
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const colorBlock = (color) => {
  return {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: color,
    margin: 2,
  };
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: '50%',
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'relative',
    bottom: -25,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  colorList: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  }
});
