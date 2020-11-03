import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { UserContext } from '../../common/context/UserProvider';
import { IUserContext } from '../../common/interfaces/states';
import Loading from '../../components/Loading';
import UserGuest from './UserGuestScreen';
import UserLogged from './UserLoggedScreen';

const Account: React.FC = () => {
  const isAuthenticated: boolean = !!useContext<IUserContext>(UserContext).user
    .user;

  return isAuthenticated === null ? (
    <Loading isVisible text='Loading...' />
  ) : isAuthenticated ? (
    <UserLogged />
  ) : (
    <UserGuest />
  );
};

export default Account;

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
