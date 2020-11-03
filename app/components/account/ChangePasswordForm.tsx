import React, { useContext, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { reauthenticate, signOut } from '../../api/auth';
import { updatePassword } from '../../api/profile';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { ToastContext } from '../../common/context/ToastProvider';
import { IFormChangePassword } from '../../common/interfaces/forms';
import { IToastContext } from '../../common/interfaces/states';

interface IChangePasswordFormProps {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({
  showModal,
}) => {
  const { show } = useContext<IToastContext>(ToastContext);
  const [formData, setFormData] = useState<IFormChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState<IFormChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(
    false
  );
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(
    false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    key: keyof IFormChangePassword
  ) => {
    setFormData({
      ...formData,
      [key]: e.nativeEvent.text,
    });
  };

  const handleSubmit = async () => {
    let isSetError = true;
    setErrorMessage({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    let errorsTemp: IFormChangePassword = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      if (!formData.currentPassword) {
        errorsTemp.currentPassword = 'Current password is required';
      }
      if (!formData.newPassword) {
        errorsTemp.newPassword = 'New password is required';
      }

      if (!formData.confirmPassword) {
        errorsTemp.confirmPassword = 'Confirm your password';
      }
    } else if (formData.newPassword !== formData.confirmPassword) {
      errorsTemp.confirmPassword = 'New password does not match';
      errorsTemp.newPassword = 'New password does not match';
    } else if (formData.newPassword.length < 6) {
      errorsTemp.newPassword = 'New password is too short';
    } else {
      isSetError = false;
      setIsLoading(true);
      try {
        await reauthenticate(formData.currentPassword);
        await updatePassword(formData.newPassword);
        setIsLoading(false);
        showModal(false);
        await signOut();
      } catch (error) {
        show({ message: error.toString() });
        setIsLoading(false);
      }
    }

    if (isSetError) {
      setErrorMessage(errorsTemp);
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder='Current Password'
        containerStyle={styles.input}
        onChange={(e) => onChange(e, 'currentPassword')}
        value={formData.currentPassword}
        errorMessage={errorMessage.currentPassword}
        secureTextEntry={!showCurrentPassword}
        rightIcon={{
          type: 'material-community',
          name: showCurrentPassword ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: () => {
            setShowCurrentPassword(!showCurrentPassword);
          },
        }}
      />
      <Input
        placeholder='New Password'
        containerStyle={styles.input}
        onChange={(e) => onChange(e, 'newPassword')}
        value={formData.newPassword}
        errorMessage={errorMessage.newPassword}
        secureTextEntry={!showNewPassword}
        rightIcon={{
          type: 'material-community',
          name: showNewPassword ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: () => {
            setShowNewPassword(!showNewPassword);
          },
        }}
      />
      <Input
        placeholder='Confirm Password'
        containerStyle={styles.input}
        onChange={(e) => onChange(e, 'confirmPassword')}
        value={formData.confirmPassword}
        errorMessage={errorMessage.confirmPassword}
        secureTextEntry={!showConfirmPassword}
        rightIcon={{
          type: 'material-community',
          name: showConfirmPassword ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: () => {
            setShowConfirmPassword(!showConfirmPassword);
          },
        }}
      />
      <Button
        title='Change Password'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={handleSubmit}
        loading={isLoading}
      />
    </View>
  );
};

export default ChangePasswordForm;

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
