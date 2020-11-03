import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getTopRestaurants } from '../api/restaurants';
import { ToastContext } from '../common/context/ToastProvider';
import { IRestaurant } from '../common/interfaces/common';
import { IToastContext } from '../common/interfaces/states';
import { RestaurantScreenNavigationProp } from '../common/routes/restaurants';
import Loading from '../components/Loading';
import ListTopRestaurant from '../components/ranking/ListTopRestaurant';

const TopRestaurants: React.FC = () => {
  const navigation = useNavigation<RestaurantScreenNavigationProp>();
  const { show } = useContext<IToastContext>(ToastContext);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getTopRestaurants()
      .then((response) => {
        setRestaurants(response);
      })
      .catch(() => {
        show({ message: 'Error fetching Top restaurants' });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <Loading isVisible={isLoading} text='Loading top restaurants...' />
  ) : (
    <View>
      <ListTopRestaurant restaurants={restaurants} navigation={navigation} />
    </View>
  );
};

export default TopRestaurants;

const styles = StyleSheet.create({});
