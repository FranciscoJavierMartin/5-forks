import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Loading from '../../components/Loading';
import AddRestaurantsForm from '../../components/restaurants/AddRestaurantForm';

const AddRestaurantScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <View>
      <AddRestaurantsForm setIsLoading={setIsLoading} />
      <Loading isVisible={isLoading} text='Creating restaurant' />
    </View>
  );
};

export default AddRestaurantScreen;

const styles = StyleSheet.create({});
