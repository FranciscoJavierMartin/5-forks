import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import InfoUser from '../../components/account/InfoUser';
import AccountOptions from '../../components/account/AccountOptions';
import Loading from '../../components/Loading';
import { signOut } from '../../api/auth';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { IUserContext } from '../../common/interfaces/states';
import { UserContext } from '../../common/context/UserProvider';

const UserLogged: React.FC = () => {
  const { user } = useContext<IUserContext>(UserContext).user;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const [reloadUser, setReloadUserInfo] = useState<boolean>(false);

  useEffect(() => {
    setReloadUserInfo(false);
  }, [reloadUser, user]);

  return (
    <View style={styles.viewUserInfo}>
      {user && (
        <>
          <InfoUser
            userInfo={user}
            setIsLoading={setIsLoading}
            setLoadingText={setLoadingText}
          />
          <AccountOptions
            userInfo={user}
            setReloadUserInfo={setReloadUserInfo}
          />
          <Button
            title='Sign Out'
            onPress={() => signOut()}
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionText}
          />
        </>
      )}
      <Loading isVisible={isLoading} text={loadingText} />
    </View>
  );
};

export default UserLogged;

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: '100%',
    backgroundColor: '#f2f2f2',
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: PRIMARY_COLOR,
  },
});
