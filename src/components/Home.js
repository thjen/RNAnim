import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing, Dimensions, 
  Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const {width, height} = Dimensions.get('window');
 
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(0),
      springValue: new Animated.Value(0.5),
      rotateValue: new Animated.Value(0)
    };
  }

  static navigationOptions = ({navigation}) => ({
    tabBarIcon: ({tintColor}) => (
      <Ionicons name="md-star" size={25} color={tintColor}/>
    )
  })

  faceAnim = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 2000, // 1s
    }).start();
  }

  tranformAnim = () => {
    Animated.timing(this.state.xValue, {
      toValue: width - 100,
      duration: 2000,
      //easing: Easing.linear // chuyen? dong. tuyen' tinh' (thang? deu)
      //easing: Easing.back() // lui` lai roi chuyen dong
      easing: Easing.cubic, // chuyen? dong. co' gia toc'
    }).start(() => {
      // call when anim finish
      Animated.timing(this.state.xValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
      }).start(() => {
        // call when finish
        this.tranformAnim();
      });
    });
  }

  springAnim = () => {
    Animated.spring(this.state.springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  }

  rotateAnim = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 2000,
        easing: Easing.linear 
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0
      })
    ]).start(() => {
      this.rotateAnim();
    });
  }

  moveAndRotateAnim = () => {
    Animated.parallel([
      this.tranformAnim(),
      this.rotateAnim(),
    ]).start();
  }

  render() {
    const interpolatedRotateAnim = this.state.rotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        {/* <Animated.View style={[styles.animationView, /*{opacity: this.state.fadeValue}*/ /*{left: this.state.xValue}]>}> */}
        {/* </Animated.View> */}
        <Animated.Image source={require('../../assets/images/morning.png')}
          style={[styles.imageView, 
          {left: this.state.xValue},
          //{transform: [{scale: this.state.springValue}], alignSelf: 'center'}
          {transform: [{rotate: interpolatedRotateAnim}]}
          ]}>

        </Animated.Image>
        <TouchableOpacity style={{alignSelf: 'center',paddingHorizontal: 20,marginTop: 20, width: 100, height: 50, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center'}}
          onPress={this.moveAndRotateAnim}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Start anim</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  animationView: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue'
  },
  imageView: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent'
  }
});
