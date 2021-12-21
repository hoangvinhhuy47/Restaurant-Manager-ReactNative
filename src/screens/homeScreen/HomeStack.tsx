import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home/Home.view';

import DetailDeskView from '../homeScreen/detailDesk/DetailDesk.view'
import TakeAway from '../homeScreen/takeaway/TakeAway.view'
const HomeSN = createStackNavigator();

const HomeStack = (props: any) => {
  return (
    <HomeSN.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <HomeSN.Group>
        <HomeSN.Screen name="Home" component={Home} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="TakeAway" component={TakeAway} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="DetailDesk" component={DetailDeskView} />
      </HomeSN.Group>
    </HomeSN.Navigator>

  );
};

export default HomeStack;
