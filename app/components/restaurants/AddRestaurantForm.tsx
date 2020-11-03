import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { addRestaurant } from '../../api/restaurants';
import { uploadRestaurantPhotos } from '../../api/storage';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { RESTAURANTS_SCREEN_NAME } from '../../common/constants/routes';
import { ToastContext } from '../../common/context/ToastProvider';
import { ILocation } from '../../common/interfaces/common';
import { IFormAddRestaurant } from '../../common/interfaces/forms';
import { IToastContext } from '../../common/interfaces/states';
import Map from './Map';
import RestaurantImage from './RestaurantImage';
import UploadImage from './UploadImage';

interface IAddRestaurantFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRestaurantForm: React.FC<IAddRestaurantFormProps> = ({
  setIsLoading,
}) => {
  const navigation = useNavigation();
  const { show } = useContext<IToastContext>(ToastContext);
  const [isVisibleMap, setIsVisibleMap] = useState<boolean>(false);
  const [imagesSelected, setImagesSelected] = useState<string[]>([]);
  const [
    locationRestaurant,
    setLocationRestaurant,
  ] = useState<ILocation | null>(null);
  const [formData, setFormData] = useState<IFormAddRestaurant>({
    name: '',
    address: '',
    description: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    address: '',
    description: '',
    photos: '',
    location: '',
  });

  useEffect(() => {
    return () => {
      setLocationRestaurant(null);
    };
  });

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    key: keyof IFormAddRestaurant
  ) => {
    setFormData({
      ...formData,
      [key]: e.nativeEvent.text,
    });
  };

  const handleSubmit = async () => {
    setErrorMessages({
      name: '',
      description: '',
      address: '',
      photos: '',
      location: '',
    });

    if (!formData.name || !formData.address || !formData.description) {
      if (!formData.name) {
        setErrorMessages((previousState) => ({
          ...previousState,
          name: 'Name is required',
        }));
      }

      if (!formData.address) {
        setErrorMessages((previousState) => ({
          ...previousState,
          address: 'Address is required',
        }));
      }

      if (!formData.description) {
        setErrorMessages((previousState) => ({
          ...previousState,
          description: 'Description is required',
        }));
      }
    } else if (imagesSelected.length === 0) {
      show({ message: 'At least one image should be included' });
    } else if (!locationRestaurant) {
      show({ message: 'Add the restaurant location on the map' });
    } else {
      setIsLoading(true);

      const imagesBlob = await Promise.all(
        imagesSelected.map(async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();
          const ref = await uploadRestaurantPhotos(blob);
          return await ref.ref.getDownloadURL();
        })
      );

      try {
        await addRestaurant({
          ...formData,
          location: locationRestaurant,
          images: imagesBlob,
        });

        setIsLoading(false);
        navigation.navigate(RESTAURANTS_SCREEN_NAME);
      } catch (error) {
        show({ message: 'Error creating restaurant' });
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <RestaurantImage imageRestaurant={imagesSelected[0]} />
      <View style={styles.viewForm}>
        <Input
          placeholder='Restaurant Name'
          value={formData.name}
          onChange={(e) => onChange(e, 'name')}
          containerStyle={styles.input}
          errorMessage={errorMessages.name}
        />
        <Input
          placeholder='Address'
          containerStyle={styles.input}
          value={formData.address}
          onChange={(e) => onChange(e, 'address')}
          errorMessage={errorMessages.address}
          rightIcon={{
            type: 'material-community',
            name: 'google-maps',
            color: locationRestaurant ? PRIMARY_COLOR : '#c2c2c2',
            onPress: (e) => setIsVisibleMap(true),
          }}
        />
        <Input
          placeholder='Description'
          multiline
          inputContainerStyle={styles.textArea}
          value={formData.description}
          onChange={(e) => onChange(e, 'description')}
          errorMessage={errorMessages.description}
        />
        <UploadImage
          imagesSelected={imagesSelected}
          setImagesSelected={setImagesSelected}
        />
        <Button
          title='Add Restaurant'
          onPress={handleSubmit}
          buttonStyle={styles.btnAddRestaurant}
        />
        <Map
          isVisibleMap={isVisibleMap}
          setIsVisibleMap={setIsVisibleMap}
          locationRestaurant={locationRestaurant}
          setLocationRestaurant={setLocationRestaurant}
        />
      </View>
    </ScrollView>
  );
};

export default AddRestaurantForm;

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  viewForm: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: PRIMARY_COLOR,
    margin: 20,
  },
});
