import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon, ListItem } from 'react-native-elements';
import {
  RESTAURANTS_SCREEN_NAME,
  RESTAURANT_SCREEN_NAME,
} from '../../common/constants/routes';
import { IRestaurant } from '../../common/interfaces/common';

interface ISearchRestaurantItemProps {
  restaurant: IRestaurant;
  navigation: any;
}

const SearchRestaurantItem: React.FC<ISearchRestaurantItemProps> = ({
  restaurant,
  navigation,
}) => {
  return (
    <ListItem
      onPress={() =>
        navigation.navigate(RESTAURANTS_SCREEN_NAME, {
          screen: RESTAURANT_SCREEN_NAME,
          params: {
            id: restaurant.id,
            name: restaurant.name,
          },
        })
      }
    >
      <Avatar
        source={
          restaurant.images[0]
            ? { uri: restaurant.images[0] }
            : require('../../../assets/no-image.png')
        }
        renderPlaceholderContent={<ActivityIndicator size='small' />}
      />
      <ListItem.Content>
        <ListItem.Title>{restaurant.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default SearchRestaurantItem;

const styles = StyleSheet.create({});
