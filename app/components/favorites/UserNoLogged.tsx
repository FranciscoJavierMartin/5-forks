import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import {
  ACCOUNT_SCREEN_NAME,
  LOGIN_SCREEN_NAME,
} from '../../common/constants/routes';

const UserNoLogged: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewBody}>
      <Icon type='material-community' name='alert-outline' size={50} />
      <Text style={styles.noUserText}>
        You need to be logged to use this tab.
      </Text>
      <Button
        title='Go to login'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogin}
        onPress={() =>
          navigation.navigate(ACCOUNT_SCREEN_NAME, {
            screen: LOGIN_SCREEN_NAME,
          })
        }
      />
    </View>
  );
};

export default UserNoLogged;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noUserText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: 20,
    width: '80%',
  },
  btnLogin: {
    backgroundColor: PRIMARY_COLOR,
  },
});
