import {createBottomTabNavigator} from 'react-navigation';
import Home from './src/components/Home';
import First from './src/components/Firts';
import Second from './src/components/Second';

const Tabs = createBottomTabNavigator({
  'Home': {
    screen: Home
  },
  'First': {
    screen: First
  },
  'Second': {
    screen: Second
  },
  }, {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    }
  }
);
export default Tabs