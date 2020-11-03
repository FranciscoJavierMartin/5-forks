import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  getInitialRestaurants,
  getMoreRestaurants,
  getTotalRestaurants,
} from '../../api/restaurants';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { ADD_RESTAURANT_SCREEN_NAME } from '../../common/constants/routes';
import { ToastContext } from '../../common/context/ToastProvider';
import { UserContext } from '../../common/context/UserProvider';
import { IRestaurant } from '../../common/interfaces/common';
import { IToastContext, IUserContext } from '../../common/interfaces/states';
import ListRestaurants from '../../components/restaurants/ListRestaurants';

const Restaurants: React.FC = () => {
  const navigation = useNavigation();
  const { show } = useContext<IToastContext>(ToastContext);
  const { user } = useContext<IUserContext>(UserContext).user;
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [totalRestaurants, setTotalRestaurants] = useState<number>(0);
  const [startRestaurant, setStartRestaurant] = useState<IRestaurant>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      (async () => {
        try {
          setTotalRestaurants(await getTotalRestaurants());
          const restaurantsData = await getInitialRestaurants();
          setStartRestaurant(restaurantsData.startRestaurant as any);
          setRestaurants(restaurantsData.restaurants as any[]);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }, [])
  );

  const handleLoadMore = async () => {
    if (restaurants.length < totalRestaurants && startRestaurant) {
      setIsLoadingMore(true);
      try {
        const restaurantsData = await getMoreRestaurants(
          startRestaurant.createAt
        );
        setStartRestaurant(restaurantsData.startRestaurant as any);
        setRestaurants([
          ...restaurants,
          ...(restaurantsData.restaurants as any[]),
        ]);
        setIsLoadingMore(false);
      } catch (error) {
        setIsLoadingMore(false);
        show({ message: 'Error loading restaurants' });
      }
    }
  };

  return (
    <View style={styles.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        handleLoadMoreRestaurants={handleLoadMore}
      />
      {user && (
        <Icon
          type='material-community'
          name='plus'
          color={PRIMARY_COLOR}
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate(ADD_RESTAURANT_SCREEN_NAME)}
        />
      )}
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
