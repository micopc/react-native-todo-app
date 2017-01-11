import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class Start extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Todo React Native App</Text>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({ id: 'Main' })}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Empezar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  main: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnText: {
    color: '#3F51B5',
    fontSize: 18,
  }
});

export default Start;
