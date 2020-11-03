import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import { FAVORITES_SCREEN_NAME } from '../common/constants/routes';

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={FAVORITES_SCREEN_NAME}
        component={FavoritesScreen}
        options={{ title: 'Favorites Restaurants' }}
      />
    </Stack.Navigator>
  );
}
