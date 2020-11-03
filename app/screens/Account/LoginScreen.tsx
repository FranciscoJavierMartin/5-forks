import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { REGISTER_SCREEN } from '../../common/constants/routes';
import LoginForm from '../../components/account/LoginForm';
import LoginGoogle from '../../components/account/LoginGoogle';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Image
        source={require('../../../assets/5-tenedores-letras-icono-logo.png')}
        resizeMode='contain'
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm />
        <Text style={styles.textRegister}>
          Don't have an account yet?{' '}
          <Text
            style={styles.btnRegister}
            onPress={() => {
              navigation.navigate(REGISTER_SCREEN);
            }}
          >
            Register now
          </Text>
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <LoginGoogle />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: PRIMARY_COLOR,
    margin: 40,
  },
});
