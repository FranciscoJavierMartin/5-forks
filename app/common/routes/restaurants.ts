import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ADD_RESTAURANT_SCREEN_NAME,
  ADD_REVIEW_RESTAURANT_NAME,
  RESTAURANTS_SCREEN_NAME,
  RESTAURANT_SCREEN_NAME,
} from '../constants/routes';

export interface IRestaurantScreenParams {
  id: string;
  name: string;
}

export interface IAddReviewRestaurantScreenParams {
  id: string;
}

export type RestaurantsRootStackParamList = {
  [RESTAURANTS_SCREEN_NAME]: undefined;
  [RESTAURANT_SCREEN_NAME]: IRestaurantScreenParams;
  [ADD_RESTAURANT_SCREEN_NAME]: undefined;
  [ADD_REVIEW_RESTAURANT_NAME]: IAddReviewRestaurantScreenParams;
};

export type RestaurantScreenRouteProp = RouteProp<
  RestaurantsRootStackParamList,
  typeof RESTAURANT_SCREEN_NAME
>;

export type RestaurantScreenNavigationProp = StackNavigationProp<
  RestaurantsRootStackParamList,
  typeof RESTAURANT_SCREEN_NAME
>;
