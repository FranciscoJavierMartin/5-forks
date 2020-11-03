import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RESTAURANT_SCREEN_NAME } from '../../common/constants/routes';
import { IRestaurant } from '../../common/interfaces/common';
import { RestaurantsRootStackParamList } from '../../common/routes/restaurants';
import TopRestaurantItem from './TopRestaurantItem';

interface IListTopRestaurantProps {
  navigation: StackNavigationProp<
    RestaurantsRootStackParamList,
    typeof RESTAURANT_SCREEN_NAME
  >;
  restaurants: IRestaurant[];
}

const ListTopRestaurant: React.FC<IListTopRestaurantProps> = ({
  navigation,
  restaurants,
}) => {
  return (
    <FlatList
      data={restaurants}
      renderItem={({ item, index }) => (
        <TopRestaurantItem
          navigation={navigation}
          restaurant={item}
          index={index}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ListTopRestaurant;

const styles = StyleSheet.create({});
