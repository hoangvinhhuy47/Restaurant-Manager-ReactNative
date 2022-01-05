import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Setting from '../screens/setting/Setting.view';
import HomeStack from '../screens/homeScreen/HomeStack';

import { HOMEICON, SETTINGICON, Menu, ICTakeAway } from '../assets';
import TakeAwaysStack from '../screens/homeScreen/takeaway/TakeAwaysStack';

import SetBefore from '../screens/homeScreen/setbefore/SetBefore.view'


//for tabbar

const Tab = createBottomTabNavigator();

export const BottomTab = (props: any) => {
  // const myIcon = ;

  return (
    <Tab.Navigator
      initialRouteName='Tại Bàn'
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={'Tại Bàn'}
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={HOMEICON}
              style={[styles.tabbarIcon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Mang Về'}
        component={TakeAwaysStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={ICTakeAway}
              style={[styles.tabbarIcon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Đặt Trước'}
        component={SetBefore}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={Menu}
              style={[styles.tabbarIcon, { tintColor: color }]}
            />
          ),
        }}
      />


      <Tab.Screen
        name={'Cài đặt'}
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={SETTINGICON}
              style={[styles.tabbarIcon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabbarIcon: {
    width: 26,
    height: 26,
  },
});