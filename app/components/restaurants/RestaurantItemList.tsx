import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native-elements';
import { RESTAURANT_SCREEN_NAME } from '../../common/constants/routes';
import { IRestaurant } from '../../common/interfaces/common';
import { RestaurantsRootStackParamList } from '../../common/routes/restaurants';

interface IRestaurantItemListProps {
  restaurant: IRestaurant;
  navigation: StackNavigationProp<
    RestaurantsRootStackParamList,
    typeof RESTAURANT_SCREEN_NAME
  >;
}
const RestaurantItemList: React.FC<IRestaurantItemListProps> = ({
  restaurant,
  navigation,
}) => {
  const imagesRestaurant = restaurant.images[0];

  const goRestaurant = () => {
    navigation.navigate(RESTAURANT_SCREEN_NAME, {
      id: restaurant.id,
      name: restaurant.name,
    });
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode='cover'
            PlaceholderContent={<ActivityIndicator color='#fff' />}
            style={styles.imageRestaurant}
            source={
              imagesRestaurant
                ? { uri: imagesRestaurant }
                : require('../../../assets/no-image.png')
            }
          />
        </View>
        <View>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.description.length > 60
              ? `${restaurant.description.substr(0, 60)}...`
              : restaurant.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantItemList;

const styles = StyleSheet.create({
  viewRestaurant: {
    flexDirection: 'row',
    margin: 10,
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
  },
  restaurantName: {
    fontWeight: 'bold',
  },
  restaurantAddress: {
    paddingTop: 2,
    color: 'grey',
  },
  restaurantDescription: {
    paddingTop: 2,
    color: 'grey',
    width: 300,
  },
});
