import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

const NoRestaurants: React.FC = () => {
  return (
    <View style={styles.viewNoRestaurants}>
      <Icon type='material-community' name='alert' size={50} />
      <Text style={styles.noRestaurantsText}>
        You have not any favorite restaurant. Try adding some.
      </Text>
    </View>
  );
};

export default NoRestaurants;

const styles = StyleSheet.create({
  viewNoRestaurants: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRestaurantsText: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
