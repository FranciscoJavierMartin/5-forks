import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';

const NotFoundRestaurants: React.FC = () => {
  return (
    <View style={styles.notFoundView}>
      <Image
        source={require('../../../assets/no-result-found.png')}
        resizeMode='cover'
        style={styles.notFoundImage}
      />
    </View>
  );
};

export default NotFoundRestaurants;

const styles = StyleSheet.create({
  notFoundView: {
    display: 'flex',
    alignItems: 'center',
  },
  notFoundImage: {
    width: 200,
    height: 200,
  },
});
