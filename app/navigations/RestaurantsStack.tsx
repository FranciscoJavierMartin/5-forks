import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantsScreen from '../screens/Restaurants/RestaurantsScreen';
import {
  ADD_RESTAURANT_SCREEN_NAME,
  ADD_REVIEW_RESTAURANT_NAME,
  RESTAURANTS_SCREEN_NAME,
  RESTAURANT_SCREEN_NAME,
} from '../common/constants/routes';
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurantScreen';
import RestaurantScreen from '../screens/Restaurants/RestaurantScreen';
import { RestaurantsRootStackParamList } from '../common/routes/restaurants';
import AddReviewRestaurantScreen from '../screens/Restaurants/AddReviewRestaurantScreen';

const Stack = createStackNavigator<RestaurantsRootStackParamList>();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RESTAURANTS_SCREEN_NAME}
        component={RestaurantsScreen}
        options={{ title: 'Restaurants' }}
      />
      <Stack.Screen
        name={ADD_RESTAURANT_SCREEN_NAME}
        component={AddRestaurantScreen}
        options={{ title: 'Add restaurant' }}
      />
      <Stack.Screen
        name={RESTAURANT_SCREEN_NAME}
        component={RestaurantScreen}
      />
      <Stack.Screen
        name={ADD_REVIEW_RESTAURANT_NAME}
        component={AddReviewRestaurantScreen}
        options={{ title: 'Add Review' }}
      />
    </Stack.Navigator>
  );
}
