import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

var colors = [
  '#FF482F',
  '#F8CE64',
  '#74F8B7',
  '#ADC96C',
  '#FF9B31',
  '#FF5677',
  '#BB60BF',
  '#54F393',
];

class Tile extends React.Component {
  state = { transformed: false };

  _onPressIn() {
    this.setState({ transformed: true });
  }

  _onPressOut() {
    this.setState({ transformed: false });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={this._onPressIn.bind(this)}
        onPressOut={this._onPressOut.bind(this)}>
        <View
          style={{
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').height / 4,
            backgroundColor: this.props.color,
            transform: [{ scale: this.state.transformed ? 0.5 : 1 }],
          }}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flexWrap: 'wrap', backgroundColor: 'black' }}>
        <StatusBar hidden={true} />
        {colors.map((color, i) => <Tile key={i} color={color} />)}
      </View>
    );
  }
}
