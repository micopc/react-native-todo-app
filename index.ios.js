/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import Start from './app/components/Start';
import Main from './app/components/Main';

export default class ReactNativeTodoApp extends Component {

  _renderScene(route, navigator) {
    if (route.id === 'Start') {
      return (
        <Start navigator={navigator} />
      )
    } else if (route.id === 'Main') {
      return (
        <Main navigator={navigator} />
      )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'Start' }}
        renderScene={this._renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('ReactNativeTodoApp', () => ReactNativeTodoApp);
