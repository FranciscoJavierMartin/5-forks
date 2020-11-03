import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Icon, ListItem, Rating } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getRestaurantById } from '../../api/restaurants';
import { RESTAURANT_SCREEN_NAME } from '../../common/constants/routes';
import { ToastContext } from '../../common/context/ToastProvider';
import { ILocation, IRestaurant } from '../../common/interfaces/common';
import { IToastContext, IUserContext } from '../../common/interfaces/states';
import { RestaurantsRootStackParamList } from '../../common/routes/restaurants';
import Carousel from '../../components/Carousel';
import Loading from '../../components/Loading';
import RestaurantImageCarousel from '../../components/restaurants/RestaurantImageCarousel';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import ListReview from '../../components/restaurants/ListReview';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../common/context/UserProvider';
import {
  addFavorite,
  getIfRestaurantExists,
  removeFavorite,
} from '../../api/favorites';

interface IRestaurantScreenProps
  extends StackScreenProps<
    RestaurantsRootStackParamList,
    typeof RESTAURANT_SCREEN_NAME
  > {}

const screenWidth = Dimensions.get('screen').width;

const listInfo = [
  {
    text: 'Fake street',
    iconName: 'map-marker',
    iconType: 'material-community',
    action: null,
  },
  {
    text: '111 222 333',
    iconName: 'phone',
    iconType: 'material-community',
    action: null,
  },
  {
    text: 'restaurant@test.com',
    iconName: 'at',
    iconType: 'material-community',
    action: null,
  },
];

const RestaurantScreen: React.FC<IRestaurantScreenProps> = ({
  navigation,
  route,
}) => {
  const { show } = useContext<IToastContext>(ToastContext);
  const { user } = useContext<IUserContext>(UserContext).user;
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState<boolean>(false);

  navigation.setOptions({
    title: route.params.name,
  });

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getRestaurantById(route.params.id)
        .then((response) => {
          const responseData = {
            ...response.data(),
            id: response.id,
          };
          setRestaurant(responseData as any);
          setRating((responseData as any).rating);
        })
        .catch((error) => {
          show({ message: `Error fetching ${route.params.name}` });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [])
  );

  useEffect(() => {
    if (user && restaurant) {
      getIfRestaurantExists(restaurant.id, user?.uid).then(
        (response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        }
      );
    }
  }, [user?.uid, restaurant]);

  const openAppMap = (location: ILocation, name: string) => {
    openMap({
      ...location,
      zoom: 19,
      query: name,
    });
  };

  const toggleFavorite = async () => {
    setIsLoadingFavorite(true);
    try {
      if (isFavorite) {
        await removeFavorite(restaurant!!.id, user!!.uid);
      } else {
        await addFavorite(user!!.uid, restaurant!!.id);
      }
      setIsFavorite((previousState) => !previousState);
    } catch (error) {
      show({ message: 'Error adding restaurant to favorites' });
    } finally {
      setIsLoadingFavorite(false);
    }
  };

  return isLoading ? (
    <Loading isVisible={isLoading} text={`Loading ${route.params.name}`} />
  ) : restaurant ? (
    <ScrollView style={styles.viewBody}>
      {!!user && (
        <View style={styles.viewFavorite}>
          {isLoadingFavorite ? (
            <ActivityIndicator />
          ) : (
            <Icon
              type='material-community'
              name={isFavorite ? 'heart' : 'heart-outline'}
              color={PRIMARY_COLOR}
              size={35}
              underlayColor='transparent'
              onPress={toggleFavorite}
            />
          )}
        </View>
      )}
      <Carousel
        height={250}
        width={screenWidth}
        images={restaurant.images}
        ImageToRender={RestaurantImageCarousel}
      />
      <View style={styles.viewRestaurantTitle}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Rating
            style={styles.rating}
            imageSize={20}
            readonly
            startingValue={rating}
          />
        </View>
        <Text style={styles.restaurantDescription}>
          {restaurant.description}
        </Text>
      </View>
      <View style={styles.viewRestaurantInfo}>
        <Text style={styles.restaurantInfoTitle}>Info</Text>
        <MapView
          style={{ height: 100, width: '100%' }}
          initialRegion={restaurant.location}
          onPress={() => openAppMap(restaurant.location, restaurant.name)}
        >
          <Marker
            coordinate={{
              ...restaurant.location,
            }}
          />
        </MapView>
        {listInfo.map((item) => (
          <ListItem key={item.text} containerStyle={styles.containerListItem}>
            <Icon
              name={item.iconName}
              type={item.iconType}
              color={PRIMARY_COLOR}
            />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
        <ListReview
          navigation={navigation}
          id={restaurant.id}
          setRating={setRating}
        />
      </View>
    </ScrollView>
  ) : (
    <Text>Error on fetching restaurant</Text>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewRestaurantTitle: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  restaurantDescription: {
    marginTop: 5,
    color: 'grey',
  },
  rating: {
    position: 'absolute',
    right: 0,
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
  },
  viewFavorite: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
});
