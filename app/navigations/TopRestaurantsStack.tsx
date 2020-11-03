import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopRestaurantsScreen from '../screens/TopRestaurantsScreen';
import { TOP_RESTAURANTS_SCREEN_NAME } from '../common/constants/routes';

const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={TOP_RESTAURANTS_SCREEN_NAME}
        component={TopRestaurantsScreen}
        options={{ title: 'Top Restaurants' }}
      />
    </Stack.Navigator>
  );
}
