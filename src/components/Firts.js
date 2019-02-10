import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing, Dimensions, 
  Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class First extends React.Component {
  constructor(props) {
    super(props);
    let animValues = [];
    for (let i = 0; i < 1000; i++) {
      animValues.push(new Animated.Value(0)); // 1000 views for anims
    }
    this.state={
      animValue: animValues
    };
  }

  static navigationOptions = ({navigation}) => ({
    tabBarIcon: ({tintColor}) => (
      <Ionicons name='md-home' size={25} color={tintColor}/>
    )
  })

  componentDidMount() {
    this.staggerAnim();
  }

  staggerAnim = () => {
    const anim = this.state.animValue.map((animValue) => {
      // convert animValue to Animated.timing
      return Animated.timing(
        animValue,
        {
          toValue: 1,
          duration: 3000,
        }
      )
    });
    Animated.stagger(10, anim).start(); //Animated1 start, after 10ms animated2 start...
  }
  render() {
    const animatedView = this.state.animValue.map((animValue, index) => {
      return <Animated.View
        key={index}
        style={[styles.animView, 
          {
            opacity: animValue,
            backgroundColor: index % 2 === 0 ? 'skyblue' : 'steelblue'
          },
        ]}>

      </Animated.View>
    });
    return (
      <View style={styles.container}>
        {animatedView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 30
  },
  animView: {
    height: 10,
    width: 10,
    backgroundColor: 'red',
    margin: 3
  }
});