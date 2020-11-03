import React, { useContext, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { reauthenticate } from '../../api/auth';
import { updateUserEmail } from '../../api/profile';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { ToastContext } from '../../common/context/ToastProvider';
import { IFormLoginValues } from '../../common/interfaces/forms';
import { IToastContext } from '../../common/interfaces/states';
import { validateEmail } from '../../common/utils/validations';

interface IChangeEmailFormProps {
  email: string | null;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeEmailForm: React.FC<IChangeEmailFormProps> = ({
  email,
  showModal,
  setReloadUserInfo,
}) => {
  const { show } = useContext<IToastContext>(ToastContext);
  const [formData, setFormData] = useState<IFormLoginValues>({
    email: email || '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState<IFormLoginValues>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    key: keyof IFormLoginValues
  ) => {
    setFormData({
      ...formData,
      [key]: e.nativeEvent.text,
    });
  };

  const handleSubmit = () => {
    setErrorMessages({
      email: '',
      password: '',
    });

    if (!formData.email || email === formData.email) {
      setErrorMessages((previousState) => ({
        ...previousState,
        email: 'Email has not changed',
      }));
    } else if (!validateEmail(formData.email)) {
      setErrorMessages((previousState) => ({
        ...previousState,
        email: 'Invalid email',
      }));
    } else if (!formData.password) {
      setErrorMessages((previousState) => ({
        ...previousState,
        password: 'Password is required',
      }));
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then((response) => {
          updateUserEmail(formData.email)
            .then(() => {
              setIsLoading(false);
              setReloadUserInfo(true);
              showModal(false);
            })
            .catch(() => {
              show({ message: 'Error updating email' });
              setIsLoading(false);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessages((previousState) => ({
            ...previousState,
            password: 'Incorrect password',
          }));
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder='Email'
        containerStyle={styles.input}
        defaultValue={email || ''}
        onChange={(e) => onChange(e, 'email')}
        value={formData.email}
        errorMessage={errorMessages.email}
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2',
        }}
      />
      <Input
        placeholder='Password'
        containerStyle={styles.input}
        onChange={(e) => onChange(e, 'password')}
        value={formData.password}
        secureTextEntry={!showPassword}
        errorMessage={errorMessages.password}
        rightIcon={
          <Icon
            type='material-community'
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            color='#c2c2c2'
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
      <Button
        title='Update Email'
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={handleSubmit}
        loading={isLoading}
      />
    </View>
  );
};

export default ChangeEmailForm;

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
