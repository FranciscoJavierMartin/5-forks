import React, { useContext } from 'react';
import { SocialIcon } from 'react-native-elements';
import { ToastContext } from '../../common/context/ToastProvider';

const LoginGoogle: React.FC = () => {
  const { show } = useContext(ToastContext);

  const login = () => {
    show({ message: 'Not available now' });
  };

  return (
    <SocialIcon
      title='Login with Google'
      button
      type='google'
      onPress={login}
    />
  );
};

export default LoginGoogle;
