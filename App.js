import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';

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

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flexWrap: 'wrap' }}>
        <StatusBar hidden={true} />
        {colors.map((color, i) =>
          <View
            key={i}
            style={{
              width: Dimensions.get('window').width / 2,
              height: Dimensions.get('window').height / 4,
              backgroundColor: color,
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
