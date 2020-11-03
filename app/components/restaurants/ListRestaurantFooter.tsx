import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface IListRestaurantFooterProps {
  isLoading: boolean;
}

const ListRestaurantFooter: React.FC<IListRestaurantFooterProps> = ({
  isLoading,
}) => {
  return isLoading ? (
    <View style={styles.loadingRestaurants}>
      <ActivityIndicator size='large' />
    </View>
  ) : (
    <View style={styles.noMoreRestaurants}>
      <Text>There are not more restaurants</Text>
    </View>
  );
};

export default ListRestaurantFooter;

const styles = StyleSheet.create({
  loadingRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  noMoreRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});
