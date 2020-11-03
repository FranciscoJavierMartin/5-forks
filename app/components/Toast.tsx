import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ToastContext } from '../common/context/ToastProvider';
import { IToastContext } from '../common/interfaces/states';

const Toast: React.FC = () => {
  const { toast, hide } = useContext<IToastContext>(ToastContext);
  const translateYRef = useRef<Animated.Value>(new Animated.Value(-100));

  useEffect(() => {
    if (toast.isVisible) {
      Animated.timing(translateYRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: -100,
        useNativeDriver: true,
      }).start();
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { transform: [{ translateY: translateYRef.current }] },
      ]}
    >
      <TouchableOpacity onPress={hide} style={styles.content}>
        <Text style={styles.toastMessage}>{toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    borderRadius: 4,
    marginHorizontal: 16,
    padding: 4,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 0,
    left: 0,
    backgroundColor: '#ff3f3f',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%',
  },
  toastMessage: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.26,
    marginHorizontal: 10,
  },
});
