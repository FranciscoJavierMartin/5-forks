import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

const options = [
  {
    title: 'Change name',
    iconNameLeft: 'account-circle',
    iconColorLeft: '#ccc',
    iconNameRight: 'chevron-right',
    iconColorRight: '#ccc',
    key: 'displayName',
  },
  {
    title: 'Change email',
    iconNameLeft: 'at',
    iconColorLeft: '#ccc',
    iconNameRight: 'chevron-right',
    iconColorRight: '#ccc',
    key: 'email',
  },
  {
    title: 'Change password',
    iconNameLeft: 'lock-reset',
    iconColorLeft: '#ccc',
    iconNameRight: 'chevron-right',
    iconColorRight: '#ccc',
    key: 'password',
  },
];

interface IAccountOptionsProps {
  userInfo: firebase.User;
  setReloadUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountOptions: React.FC<IAccountOptionsProps> = ({
  userInfo,
  setReloadUserInfo,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [renderedComponent, setRenderedComponent] = useState<React.ReactNode>(
    null
  );

  const selectComponent = (key: string) => {
    switch (key) {
      case 'displayName':
        setRenderedComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            showModal={setIsModalVisible}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        break;
      case 'email':
        setRenderedComponent(
          <ChangeEmailForm
            email={userInfo.email}
            showModal={setIsModalVisible}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        break;
      case 'password':
        setRenderedComponent(
          <ChangePasswordForm showModal={setIsModalVisible} />
        );
        break;
      default:
        setRenderedComponent(null);
    }

    setIsModalVisible(true);
  };

  return (
    <View>
      {options.map((option) => (
        <ListItem key={option.key} onPress={() => selectComponent(option.key)}>
          <Icon
            type='material-community'
            name={option.iconNameLeft}
            color={option.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{option.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      {renderedComponent && (
        <Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
          {renderedComponent}
        </Modal>
      )}
    </View>
  );
};

export default AccountOptions;

const styles = StyleSheet.create({});
