import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import { PRIMARY_COLOR } from '../common/constants/colors';

interface ILoadingProsp {
  isVisible: boolean;
  text?: string;
}

const Loading: React.FC<ILoadingProsp> = ({ isVisible, text }) => {
  return (
    <Overlay isVisible={isVisible} style={styles.overlay} fullScreen>
      <View style={styles.view}>
        <ActivityIndicator size='large' color={PRIMARY_COLOR} />
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </Overlay>
  );
};

export default Loading;

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: PRIMARY_COLOR,
    textTransform: 'uppercase',
    marginTop: 10,
  },
});
