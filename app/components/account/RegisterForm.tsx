import React, { useContext, useState } from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Icon, Button } from 'react-native-elements';
import { IFormRegisterValues } from '../../common/interfaces/forms';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { validateEmail } from '../../common/utils/validations';
import { createUserWithEmailAndPassword } from '../../api/auth';
import { ACCOUNT_SCREEN_NAME } from '../../common/constants/routes';
import { ToastContext } from '../../common/context/ToastProvider';
import Loading from '../Loading';
import { IToastContext } from '../../common/interfaces/states';

interface IRegisterFormProps {}

const RegisterForm: React.FC<IRegisterFormProps> = () => {
  const { show } = useContext<IToastContext>(ToastContext);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(
    false
  );
  const [formData, setFormData] = useState<IFormRegisterValues>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrorMessages, setFormErrorMessages] = useState<
    IFormRegisterValues
  >({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (event: GestureResponderEvent) => {
    setFormErrorMessages({
      email: '',
      password: '',
      confirmPassword: '',
    });

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      // All fields are required
      if (!formData.email) {
        setFormErrorMessages((previousState) => ({
          ...previousState,
          email: 'Email is required',
        }));
      }
      if (!formData.password) {
        setFormErrorMessages((previousState) => ({
          ...previousState,
          password: 'Password is required',
        }));
      }
      if (!formData.confirmPassword) {
        setFormErrorMessages((previousState) => ({
          ...previousState,
          confirmPassword: 'Confirm password is required',
        }));
      }
    } else if (!validateEmail(formData.email)) {
      // Email invalid
      setFormErrorMessages((previosuState) => ({
        ...previosuState,
        email: 'Invalid email',
      }));
    } else if (formData.password !== formData.confirmPassword) {
      // Different password
      setFormErrorMessages({
        ...formErrorMessages,
        confirmPassword: 'Passwords fields does not match',
      });
    } else if (formData.password.length < 6) {
      // Password length equal or greater than 6
      setFormErrorMessages({
        ...formErrorMessages,
        password: 'Password must contains at least 6 characters',
      });
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(formData.email, formData.password)
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
    type: keyof IFormRegisterValues
  ) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
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
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder='Confirm password'
        containerStyle={styles.inputForm}
        secureTextEntry={!showConfirmPassword}
        onChange={(e) => onChange(e, 'confirmPassword')}
        errorMessage={formErrorMessages.confirmPassword}
        rightIcon={
          <Icon
            type='material-community'
            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
      />
      <Button
        title='Register'
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={handleSubmit}
        loading={isLoading}
      />
      <Loading isVisible={isLoading} text='Creating account' />
    </View>
  );
};

export default RegisterForm;

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
  btnContainerRegister: {
    marginTop: 20,
    width: '95%',
  },
  btnRegister: {
    backgroundColor: PRIMARY_COLOR,
  },
  iconRight: {
    color: '#c1c1c1',
  },
});
