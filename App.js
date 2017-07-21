import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import { Audio } from 'expo';
import Mic from './assets/svgs/mic';
import Spinner from './assets/svgs/spinner';

var tiles = [
  { color: '#FF482F', sound: require('./assets/sounds/clap.wav') },
  { color: '#F8CE64', sound: require('./assets/sounds/london.mp3') },
  { color: '#74F8B7', sound: require('./assets/sounds/yt.wav') },
  { color: '#ADC96C', sound: require('./assets/sounds/scream.wav') },
  { color: '#FF9B31', sound: require('./assets/sounds/kick.wav') },
  { color: '#FF5677', sound: require('./assets/sounds/die.wav') },
  { color: '#BB60BF', sound: require('./assets/sounds/open.wav') },
  { color: '#54F393', sound: require('./assets/sounds/snare.wav') },
];

class Tile extends React.Component {
  state = {
    scale: new Animated.Value(1),
    type: 'preset',
    spinnerRotate: new Animated.Value(0),
  };
  springOptions = {
    speed: 50,
    bounciness: 8,
    useNativeDriver: true,
  };

  componentWillMount() {
    this.soundObject = new Audio.Sound();
    this.soundObject.loadAsync(this.props.sound);
    this.setState({ type: this.props.type });
  }

  _onPressIn() {
    if (this.state.type == 'preset') {
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
  }

  _onPressOut() {
    if (this.state.type == 'preset') {
      this.animation.stop();

      this.animation = Animated.spring(this.state.scale, {
        ...this.springOptions,
        toValue: 1,
      });

      this.animation.start();
    } else if (this.state.type == 'custom') {
      this.setState({ type: 'recording' });

      // Start spinner
      this.spinnerAnimation = Animated.timing(this.state.spinnerRotate, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      });
      this.spinnerLoop = Animated.loop(this.spinnerAnimation);
      this.spinnerLoop.start();

      // Start recording
      this.recording = new Audio.Recording();
      this.recording.prepareToRecordAsync().then(() => {
        this.recording.startAsync();
      });
    } else {
      this.setState({ type: 'preset' });
      this.spinnerLoop.stop();
    }
  }

  render() {
    const spin = this.state.spinnerRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

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
          }}>
          {(this.state.type == 'custom' || this.state.type == 'recording') &&
            <Mic
              width={80}
              height={80}
              style={{
                position: 'absolute',
                top: Dimensions.get('window').height / 4 / 2 - 40,
                left: Dimensions.get('window').width / 2 / 2 - 40,
              }}
            />}
          {this.state.type == 'recording' &&
            <Animated.View
              style={{
                position: 'absolute',
                top: Dimensions.get('window').height / 4 / 2 - 60,
                left: Dimensions.get('window').width / 2 / 2 - 60,
                transform: [{ rotate: spin }],
              }}>
              <Spinner width={120} height={120} />
            </Animated.View>}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class App extends React.Component {
  componentWillMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS, // TODO(Abi): Switch back to INTERRUPTION_MODE_IOS_DO_NOT_MIX
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true, // TODO(Abi): Is this the common behavior on Android?
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
  }

  render() {
    return (
      <View style={{ flexWrap: 'wrap', backgroundColor: 'black' }}>
        <StatusBar hidden={true} />
        {tiles.map((tile, i) =>
          <Tile
            key={i}
            color={tile.color}
            sound={tile.sound}
            type={i == 0 ? 'custom' : 'preset'}
          />
        )}
      </View>
    );
  }
}
