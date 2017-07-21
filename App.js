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
import { Audio } from 'expo';

var tiles = [
  { color: '#FF482F', sound: './assets/sounds/clap.wav' },
  { color: '#F8CE64', sound: './assets/sounds/clap.wav' },
  { color: '#74F8B7', sound: './assets/sounds/clap.wav' },
  { color: '#ADC96C', sound: './assets/sounds/clap.wav' },
  { color: '#FF9B31', sound: './assets/sounds/clap.wav' },
  { color: '#FF5677', sound: './assets/sounds/clap.wav' },
  { color: '#BB60BF', sound: './assets/sounds/clap.wav' },
  { color: '#54F393', sound: './assets/sounds/clap.wav' },
];

class Tile extends React.Component {
  state = { scale: new Animated.Value(1) };
  springOptions = {
    speed: 50,
    bounciness: 8,
    useNativeDriver: true,
  };

  componentWillMount() {
    this.soundObject = new Audio.Sound();
    this.soundObject.loadAsync(require('./assets/sounds/clap.wav'));
  }

  _onPressIn() {
    this.soundObject.stopAsync().then((success, error) => {
      this.soundObject.playAsync();
    });

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
        {tiles.map((tile, i) =>
          <Tile key={i} color={tile.color} sound={tile.sound} />
        )}
      </View>
    );
  }
}
