import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getFavoritesByUserId } from '../api/favorites';
import { UserContext } from '../common/context/UserProvider';
import { IRestaurant } from '../common/interfaces/common';
import { IUserContext } from '../common/interfaces/states';
import NoRestaurants from '../components/favorites/NoRestaurants';
import RestaurantItem from '../components/favorites/RestaurantItem';
import UserNoLogged from '../components/favorites/UserNoLogged';
import Loading from '../components/Loading';
import { RestaurantScreenNavigationProp } from '../common/routes/restaurants';

interface IFavoriteScreenProps {}

const FavoritesScreen: React.FC<IFavoriteScreenProps> = () => {
  const navigation = useNavigation<RestaurantScreenNavigationProp>();
  const { user } = useContext<IUserContext>(UserContext).user;
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<{
    isVisible: boolean;
    text: string;
  }>({
    isVisible: false,
    text: '',
  });

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setIsLoading({
          isVisible: true,
          text: 'Loading favorites...',
        });
        getFavoritesByUserId(user.uid)
          .then((restaurantsData) => {
            setRestaurants(restaurantsData);
            console.log(restaurants.length);
          })
          .finally(() => {
            setIsLoading({
              isVisible: false,
              text: '',
            });
          });
      }
      setReloadData(false);
    }, [user, reloadData])
  );

  let view: React.ReactChild;

  if (isLoading.isVisible) {
    view = <Loading isVisible={isLoading.isVisible} text={isLoading.text} />;
  } else if (!user) {
    view = <UserNoLogged />;
  } else if (restaurants.length === 0) {
    view = <NoRestaurants />;
  } else {
    view = (
      <View style={styles.viewBody}>
        <FlatList
          data={restaurants}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <RestaurantItem
              restaurant={item}
              setIsLoading={setIsLoading}
              setReloadData={setReloadData}
              navigation={navigation}
            />
          )}
        />
      </View>
    );
  }

  return view;
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
