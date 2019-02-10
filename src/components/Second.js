import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing, Dimensions, 
  Image, PanResponder } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class Second extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      pan: new Animated.ValueXY(), // pan is a vector, (x,y) = coordinators
      scale: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // enable pan gesture
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // start moving
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({x: 0, y: 0})
        Animated.spring(
          this.state.scale,
          {toValue: 1.3, friction: 3}
        ).start();
      },
      onPanResponderMove: Animated.event([
        // moving
        null, // row event org ignored
        {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),
      onPanResponderRelease: (evt, gestureState) => {
        // call when step moving = 'release your finger'
        Animated.spring(
          this.state.scale,
          {toValue: 1, friction: 3}
        ).start();
      }
    });
  }

  static navigationOptions = ({navigation}) => ({
    tabBarIcon: ({tintColor}) => (
      <Ionicons name='md-git-commit' size={25} color={tintColor}/>
    )
  })

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.animView, 
          { 
            transform: [
              {scale: this.state.scale},
              {translateX: this.state.pan.x},
              {translateY: this.state.pan.y}
            ]
          } 
          ]}
          {...this._panResponder.panHandlers}>

        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animView: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'steelblue'
  }
});
