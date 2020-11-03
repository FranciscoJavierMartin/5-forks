import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Modal from '../Modal';
import { Button } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { ILocation } from '../../common/interfaces/common';

interface IMapProps {
  isVisibleMap: boolean;
  setIsVisibleMap: React.Dispatch<React.SetStateAction<boolean>>;
  locationRestaurant: ILocation | null;
  setLocationRestaurant: React.Dispatch<React.SetStateAction<ILocation | null>>;
}

const Map: React.FC<IMapProps> = ({ isVisibleMap, setIsVisibleMap, locationRestaurant, setLocationRestaurant }) => {

  useEffect(() => {
    (async () => {
      const resultPermission = await Permissions.askAsync(Permissions.LOCATION);

      if (resultPermission.granted) {
        const loc = await Location.getCurrentPositionAsync();

        setLocationRestaurant({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationRestaurant(locationRestaurant);
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {locationRestaurant && (
          <MapView
            style={styles.mapStyle}
            initialRegion={locationRestaurant}
            showsUserLocation
            onRegionChange={(region) => setLocationRestaurant(region)}
          >
            <Marker coordinate={locationRestaurant} draggable />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title='Save location'
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title='Cancel'
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapStyle: {
    width: 300,
    height: 500,
  },
  viewMapBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: '#dc3545',
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: PRIMARY_COLOR,
  },
});
