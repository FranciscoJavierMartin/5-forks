import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { signInWithEmailAndPassword } from '../../api/auth';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { ACCOUNT_SCREEN_NAME } from '../../common/constants/routes';
import { ToastContext } from '../../common/context/ToastProvider';
import { IFormLoginValues } from '../../common/interfaces/forms';
import { IToastContext } from '../../common/interfaces/states';
import { validateEmail } from '../../common/utils/validations';
import Loading from '../Loading';

const LoginForm: React.FC = () => {
  const { show } = useContext<IToastContext>(ToastContext);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormLoginValues>({
    email: '',
    password: '',
  });
  const [formErrorMessages, setFormErrorMessages] = useState<IFormLoginValues>({
    email: '',
    password: '',
  });

  const handleSubtmit = () => {
    if (!formData.email || !formData.password) {
      if (!formData.email) {
        setFormErrorMessages((previousState) => ({
          ...previousState,
          email: 'Email is required',
        }));
      }
      if (!formData.password) {
        setFormErrorMessages((previosuState) => ({
          ...previosuState,
          password: 'Password is required',
        }));
      }
    } else if (!validateEmail(formData.email)) {
      setFormErrorMessages((previousState) => ({
        ...previousState,
        email: 'Invalid',
      }));
    } else {
      signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setIsLoading(false);
          navigation.navigate(ACCOUNT_SCREEN_NAME);
        })
        .catch((error) => {
          setIsLoading(false);
          show({ message: error.message });
        });
    }
  };

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: keyof IFormLoginValues
  ) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder='Email'
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, 'email')}
        errorMessage={formErrorMessages.email}
        rightIcon={
          <Icon
            type='material-community'
            name='at'
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder='Password'
        containerStyle={styles.inputForm}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, 'password')}
        errorMessage={formErrorMessages.password}
        rightIcon={
          <Icon
            type='material-community'
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
      <Button
        title='Login'
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={handleSubtmit}
      />
      <Loading isVisible={isLoading} text='Login in process...' />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  inputForm: {
    width: '100%',
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: '95%',
  },
  btnLogin: {
    backgroundColor: PRIMARY_COLOR,
  },
  iconRight: {
    color: '#c1c1c1',
  },
});
