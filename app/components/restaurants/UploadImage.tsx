import React from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

interface IUploadImageProps {
  imagesSelected: string[];
  setImagesSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadImage: React.FC<IUploadImageProps> = ({
  imagesSelected,
  setImagesSelected,
}) => {
  const selectImage = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermissions.status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image: string) => {
    Alert.alert(
      'Remove Image',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            setImagesSelected(imagesSelected.filter((uri) => uri !== image));
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 4 && (
        <Icon
          type='material-community'
          name='cloud-upload'
          color='#7a7a7a'
          containerStyle={styles.containerIcon}
          onPress={selectImage}
        />
      )}
      {/* {imagesSelected.map((imageRestaurant: string, index: number) => ( */}
      <FlatList
        data={imagesSelected}
        horizontal
        renderItem={({ item, index }) => (
          <Avatar
            source={{ uri: item }}
            containerStyle={styles.miniatureStyle}
            onPress={() => removeImage(item)}
          />
        )}
        keyExtractor={(item) => item}
      />

      {/* ))} */}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3',
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
