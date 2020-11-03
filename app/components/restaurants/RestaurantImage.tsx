import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../common/constants/colors';

interface IRestaurantImageProps {
  imageRestaurant?: string;
}

const RestaurantImage: React.FC<IRestaurantImageProps> = ({
  imageRestaurant,
}) => {
  return (
    <View>
      <Image
        source={
          imageRestaurant
            ? { uri: imageRestaurant }
            : require('../../../assets/no-image.png')
        }
        PlaceholderContent={
          <ActivityIndicator size='large' style={styles.imagePlaceholder} />
        }
        style={styles.image}
      />
    </View>
  );
};

export default RestaurantImage;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  imagePlaceholder: {
    backgroundColor: 'white',
    color: PRIMARY_COLOR,
    width: '100%',
    height: '100%',
  },
});
