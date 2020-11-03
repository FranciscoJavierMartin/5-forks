import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import RestaurantsStack from './RestaurantsStack';
import FavoritesStack from './FavoritesStack';
import TopRestaurantsStack from './TopRestaurantsStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';

import { ACCOUNT_SCREEN_NAME, FAVORITES_SCREEN_NAME, RESTAURANTS_SCREEN_NAME, SEARCH_SCREEN_NAME, TOP_RESTAURANTS_SCREEN_NAME } from '../common/constants/routes';
import { PRIMARY_COLOR } from '../common/constants/colors';

const Tab = createBottomTabNavigator();

export default function navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={RESTAURANTS_SCREEN_NAME}
        tabBarOptions={{
          inactiveTintColor: '#646464',
          activeTintColor: PRIMARY_COLOR,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name={RESTAURANTS_SCREEN_NAME}
          component={RestaurantsStack}
          options={{ title: 'Restaurants' }}
        />
        <Tab.Screen
          name={FAVORITES_SCREEN_NAME}
          component={FavoritesStack}
          options={{ title: 'Favorites' }}
        />
        <Tab.Screen
          name={TOP_RESTAURANTS_SCREEN_NAME}
          component={TopRestaurantsStack}
          options={{ title: 'Top 5' }}
        />
        <Tab.Screen
          name={SEARCH_SCREEN_NAME}
          component={SearchStack}
          options={{ title: 'Search' }}
        />
        <Tab.Screen
          name={ACCOUNT_SCREEN_NAME}
          component={AccountStack}
          options={{ title: 'Account' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(
  route: RouteProp<Record<string, object | undefined>, string>,
  color: string
) {
  let iconName: string;

  switch (route.name) {
    case RESTAURANTS_SCREEN_NAME:
      iconName = 'compass-outline';
      break;
    case FAVORITES_SCREEN_NAME:
      iconName = 'heart-outline';
      break;
    case TOP_RESTAURANTS_SCREEN_NAME:
      iconName = 'star-outline';
      break;
    case SEARCH_SCREEN_NAME:
      iconName = 'magnify';
      break;
    case ACCOUNT_SCREEN_NAME:
      iconName = 'home-outline';
      break;
    default:
      iconName = '';
  }

  return (
    <Icon type='material-community' name={iconName} size={22} color={color} />
  );
}
