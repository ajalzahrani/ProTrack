import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

('react-native-heroicons/outline');
import * as Icons from 'react-native-heroicons/outline';

// Tab Navigator
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// Stack Navigator
import RoutineStack from './RoutineStack';

// Screens
import HomeScreen from '../screen/home/HomeScreen';
import StatScreen from '../screen/statistics/StatScreen';
import SettingsScreen from '../screen/settings/SettingsScreen';
import StoreScreen from '../screen/store/StoreScreen';

export type RouterStackRootParamList = {
  HomeScreen: undefined;
  StatScreen: undefined;
  RoutineStack: undefined;
  SettingsScreen: undefined;
  StoreScreen: undefined;
};

// componetns
import {colors, assets} from '../../assets';

const Router = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: style.tabBarStyle,
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_home}
                resizeMode="contain"
                style={{
                  // FIXME: check the color
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Icons.ShoppingBagIcon
                color={focused ? colors.red : colors.greeny}
                size={24}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Store
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Routines"
        component={RoutineStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_schedule}
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Routine
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="stat"
        component={StatScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_stat}
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Stat
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_settings}
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.semiPrimary,
  },
  tabBarVewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
  },
  tabBarIconStyle: {
    width: 20,
    height: 20,
  },
  tabBarTitleStyle: {
    marginTop: 5,
    fontSize: 11,
  },
});

export default Router;
