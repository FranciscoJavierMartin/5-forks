import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { IToastContext } from '../../common/interfaces/states';
import { ToastContext } from '../../common/context/ToastProvider';
import { uploadAvatar } from '../../api/storage';
import { updateUserPhoto } from '../../api/profile';

interface IInfoUserProps {
  userInfo: firebase.User;
  setLoadingText: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoUser: React.FC<IInfoUserProps> = ({
  userInfo,
  setIsLoading,
  setLoadingText,
}) => {
  const { photoURL, displayName, email, uid } = userInfo;
  const { show } = useContext<IToastContext>(ToastContext);

  const changeAvatar = async (): Promise<void> => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === 'denied') {
      show({ message: 'You must grant access to gallery' });
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        show({ message: 'You close the image gallery' });
      } else {
        uploadImage(result.uri)
          .then(async (photo) => {
            try {
              const downloadURL = await photo.ref.getDownloadURL();
              updateUserPhoto(downloadURL);
            } catch (error) {
              show({ message: 'Error updating profile' });
            } finally {
              setLoadingText('');
              setIsLoading(false);
            }
          })
          .catch(() => {
            setLoadingText('');
            setIsLoading(false);
            show({ message: 'Error on upload image' });
          });
      }
    }
  };

  const uploadImage = async (uri: string) => {
    setIsLoading(true);
    setLoadingText('Updating avatar');

    const response = await fetch(uri);
    const blob = await response.blob();
    return uploadAvatar(uid, blob);
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        containerStyle={styles.userInfoAvatar}
        size='large'
        source={
          photoURL
            ? {
                uri: photoURL,
              }
            : require('../../../assets/avatar-default.jpg')
        }
        onPress={changeAvatar}
        renderPlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Text style={styles.displayName}>{displayName || 'Anonymous'}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};

export default InfoUser;

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
