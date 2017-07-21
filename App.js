import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Animated,
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
  state = { scale: new Animated.Value(1) };
  springOptions = {
    speed: 50,
    bounciness: 8,
    useNativeDriver: true,
  };

  _onPressIn() {
    if (this.animation) {
      this.animation.stop();
    }

    this.animation = Animated.spring(this.state.scale, {
      ...this.springOptions,
      toValue: 0.7,
    });
    this.animation.start();
  }

  _onPressOut() {
    // this.setState({ transformed: false });
    this.animation.stop();

    this.animation = Animated.spring(this.state.scale, {
      ...this.springOptions,
      toValue: 1,
    });

    this.animation.start();
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={this._onPressIn.bind(this)}
        onPressOut={this._onPressOut.bind(this)}>
        <Animated.View
          style={{
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').height / 4,
            backgroundColor: this.props.color,
            transform: [{ scale: this.state.scale }],
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
