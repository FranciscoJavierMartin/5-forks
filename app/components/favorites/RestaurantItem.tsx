import React, { useContext } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { removeFavorite } from '../../api/favorites';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import {
  RESTAURANTS_SCREEN_NAME,
  RESTAURANT_SCREEN_NAME,
} from '../../common/constants/routes';
import { ToastContext } from '../../common/context/ToastProvider';
import { UserContext } from '../../common/context/UserProvider';
import { IRestaurant } from '../../common/interfaces/common';
import { IToastContext, IUserContext } from '../../common/interfaces/states';

interface IRestaurantItemProps {
  restaurant: IRestaurant;
  setIsLoading: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      text: string;
    }>
  >;
  setReloadData: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
}

const RestaurantItem: React.FC<IRestaurantItemProps> = ({
  restaurant,
  setIsLoading,
  setReloadData,
  navigation,
}) => {
  const confirmRemoveFavorite = () => {
    Alert.alert(
      'Remove from favorites',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: removeFromFavorites,
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const removeFromFavorites = () => {
    const { user } = useContext<IUserContext>(UserContext).user;
    const { show } = useContext<IToastContext>(ToastContext);

    if (user) {
      setIsLoading({
        isVisible: true,
        text: 'Removing favorite...',
      });
      removeFavorite(restaurant.id, user.uid)
        .then(() => {
          setIsLoading({
            isVisible: false,
            text: '',
          });
          setReloadData(true);
        })
        .catch(() => {
          setIsLoading({
            isVisible: false,
            text: '',
          });
          show({ message: 'Error removing the restaurant from favorite' });
        });
    }
  };

  return (
    <View style={styles.restaurant}>
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
        <Image
          resizeMode='cover'
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color='#fff' />}
          source={
            restaurant.images[0]
              ? { uri: restaurant.images[0] }
              : require('../../../assets/no-image.png')
          }
        />
        <View style={styles.info}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Icon
            type='material-community'
            name='heart'
            color={PRIMARY_COLOR}
            containerStyle={styles.favorite}
            onPress={confirmRemoveFavorite}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurant: {
    margin: 10,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  favorite: {
    marginTop: -35,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 100,
    zIndex: 2,
  },
});
