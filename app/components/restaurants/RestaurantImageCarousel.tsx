import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../common/constants/colors';

interface IRestaurantImageCarouselProps {
  imageURL: string;
  width: number;
  height: number;
}

const RestaurantImageCarousel: React.FC<IRestaurantImageCarouselProps> = ({
  imageURL,
  width,
  height,
}) => {
  return (
    <Image
      style={{ height, width }}
      source={{
        uri: imageURL,
      }}
      PlaceholderContent={
        <ActivityIndicator size='large' style={styles.imagePlaceholder} />
      }
    />
  );
};

export default RestaurantImageCarousel;

const styles = StyleSheet.create({
  imagePlaceholder: {
    backgroundColor: 'white',
    color: PRIMARY_COLOR,
    width: '100%',
    height: '100%',
  },
})