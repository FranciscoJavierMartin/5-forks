import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { IRestaurant } from '../../common/interfaces/common';
import { RestaurantScreenNavigationProp } from '../../common/routes/restaurants';
import Loading from '../Loading';
import ListRestaurantFooter from './ListRestaurantFooter';
import RestaurantItemList from './RestaurantItemList';

interface IListRestaurantsProps {
  restaurants: IRestaurant[];
  isLoading: boolean;
  isLoadingMore: boolean;
  handleLoadMoreRestaurants: () => Promise<void>;
}

const ListRestaurants: React.FC<IListRestaurantsProps> = ({
  restaurants,
  isLoading,
  handleLoadMoreRestaurants,
  isLoadingMore,
}) => {
  const navigation = useNavigation<RestaurantScreenNavigationProp>();
  return (
    <View>
      {isLoading ? (
        <Loading isVisible={isLoading} text='Loading restaurants...' />
      ) : restaurants.length === 0 ? (
        <Text>There are not restaurants. Try adding some of them.</Text>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <RestaurantItemList restaurant={item} navigation={navigation} />
          )}
          keyExtractor={(restaurant) => restaurant.id}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMoreRestaurants}
          ListFooterComponent={
            <ListRestaurantFooter isLoading={isLoadingMore} />
          }
        />
      )}
    </View>
  );
};

export default ListRestaurants;

const styles = StyleSheet.create({});
