import React from 'react';
import SnapCarousel from 'react-native-snap-carousel';

interface ICarouselProps {
  images: string[];
  height: number;
  width: number;
  ImageToRender: any;
}

const Carousel: React.FC<ICarouselProps> = ({
  images,
  height,
  width,
  ImageToRender,
}) => {
  return (
    <SnapCarousel
      layout='default'
      data={images}
      sliderWidth={width}
      sliderHeight={height}
      itemWidth={width}
      renderItem={(item: { item: string; index: number }) => {
        return (
          <ImageToRender imageURL={item.item} width={width} height={height} />
        );
      }}
    />
  );
};

export default Carousel;
