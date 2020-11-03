import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';

interface IModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<IModalProps> = ({
  isVisible,
  setIsVisible,
  children,
}) => {
  const closeModal = () => setIsVisible(false);

  return (
    <Overlay isVisible={isVisible} onBackdropPress={closeModal}>
      {children}
    </Overlay>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    height: 'auto',
    width: '90%',
    backgroundColor: '#fff',
  },
});
