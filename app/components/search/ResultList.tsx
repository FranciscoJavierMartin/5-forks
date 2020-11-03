import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { IRestaurant } from '../../common/interfaces/common';
import SearchRestaurantItem from './SearchRestaurantItem';

interface IResultListProps {
  restaurants: IRestaurant[];
  navigation: any;
}

const ResultList: React.FC<IResultListProps> = ({
  restaurants,
  navigation,
}) => {
  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SearchRestaurantItem restaurant={item} navigation={navigation} />
      )}
    />
  );
};

export default ResultList;

const styles = StyleSheet.create({});
