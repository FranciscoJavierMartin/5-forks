import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../../components/account/RegisterForm';

const RegisterScreen: React.FC = () => {

  return (
    <KeyboardAwareScrollView alwaysBounceVertical={false}>
      <Image
        source={require('../../../assets/5-tenedores-letras-icono-logo.png')}
        resizeMode='contain'
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm/>
      </View>
      
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
