import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/Account/AccountScreen';
import { ACCOUNT_SCREEN_NAME, LOGIN_SCREEN_NAME, REGISTER_SCREEN_NAME } from '../common/constants/routes';
import LoginScreen from '../screens/Account/LoginScreen';
import RegisterScreen from '../screens/Account/RegisterScreen';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ACCOUNT_SCREEN_NAME}
        component={AccountScreen}
        options={{ title: 'Account' }}
      />
      <Stack.Screen
        name={LOGIN_SCREEN_NAME}
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name={REGISTER_SCREEN_NAME}
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
    </Stack.Navigator>
  );
}
