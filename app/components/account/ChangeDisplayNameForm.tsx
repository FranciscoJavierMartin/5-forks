import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { updateUserDisplayName } from '../../api/profile';
import { PRIMARY_COLOR } from '../../common/constants/colors';

interface IChangeDisplayNameProps {
  displayName: string | null;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeDisplayNameForm: React.FC<IChangeDisplayNameProps> = ({
  displayName,
  showModal,
  setReloadUserInfo,
}) => {
  const [newDisplayName, setNewDisplayName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setNewDisplayName(e.nativeEvent.text);
  };

  const handleSubmit = () => {
    if (!newDisplayName) {
      setErrorMessage('Name is required');
    } else if (displayName === newDisplayName) {
      setErrorMessage('Old name cannot be the same that the previous');
    } else {
      setIsLoading(true);
      updateUserDisplayName(newDisplayName)
        .then(() => {
          setIsLoading(false);
          setReloadUserInfo(true);
          showModal(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage('Error updating name');
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder='Name'
        containerStyle={styles.input}
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#c2c2c2',
        }}
        defaultValue={displayName || ''}
        onChange={onChange}
        errorMessage={errorMessage}
      />
      <Button
        title='Update Name'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={handleSubmit}
        loading={isLoading}
      />
    </View>
  );
};

export default ChangeDisplayNameForm;

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    minWidth: 300,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: PRIMARY_COLOR,
  },
});
