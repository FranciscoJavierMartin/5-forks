import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, Image, Icon, Rating } from 'react-native-elements';
import {
  RESTAURANTS_SCREEN_NAME,
  RESTAURANT_SCREEN_NAME,
} from '../../common/constants/routes';
import { IRestaurant } from '../../common/interfaces/common';

interface ITopRestaurantItemProps {
  navigation: any;
  restaurant: IRestaurant;
  index: number;
}
const TopRestaurantItem: React.FC<ITopRestaurantItemProps> = ({
  navigation,
  restaurant,
  index,
}) => {
  let iconColor: string;

  switch (index) {
    case 0:
      iconColor = '#efb819';
      break;
    case 1:
      iconColor = '#e3e4e5';
      break;
    case 2:
      iconColor = '#cd7f32';
      break;
    default:
      iconColor = '#000';
  }

  return (
    <TouchableOpacity
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
      <Card containerStyle={styles.containerCard}>
        <Icon
          type='material-community'
          name='chess-queen'
          color={iconColor}
          size={40}
          containerStyle={styles.containerIcon}
        />
        <Image
          style={styles.restaurantImage}
          resizeMode='cover'
          PlaceholderContent={<ActivityIndicator size='large' />}
          source={
            restaurant.images[0]
              ? { uri: restaurant.images[0] }
              : require('../../../assets/no-image.png')
          }
        />
        <View style={styles.titleRating}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Rating imageSize={20} startingValue={restaurant.rating} readonly />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default TopRestaurantItem;

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 30,
    borderWidth: 0,
  },
  containerIcon: {
    position: 'absolute',
    top: -30,
    left: -30,
    zIndex: 1,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
  },
  titleRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
    marginTop: 0,
    textAlign: 'justify',
  },
});
