import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DetailDeskView from '../../homeScreen/detailDesk/DetailDesk.view'
import TakeAway from '../../homeScreen/takeaway/TakeAway.view'
const HomeSN = createStackNavigator();

const TakeAwaysStack = (props: any) => {
    return (
        <HomeSN.Navigator
            initialRouteName="TakeAway"
            screenOptions={{ headerShown: false }}>
            <HomeSN.Group>
                <HomeSN.Screen name="TakeAway" component={TakeAway} />
            </HomeSN.Group>
            <HomeSN.Group>
                <HomeSN.Screen name="DetailDesk" component={DetailDeskView} />
            </HomeSN.Group>
        </HomeSN.Navigator>

    );
};

export default TakeAwaysStack;
