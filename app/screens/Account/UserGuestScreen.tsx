import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

import { PRIMARY_COLOR } from '../../common/constants/colors';
import { LOGIN_SCREEN_NAME } from '../../common/constants/routes';

const UserGuest: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require('../../../assets/user-guest.jpg')}
        resizeMode='contain'
        style={styles.image}
      />
      <Text style={styles.title}>Check your profile</Text>
      <Text style={styles.description}>
        How do you describe your favorite restaurants? Search and view the best
        restaurants on a simple way, rate which you prefer and leave a comment.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title='Check your profile'
          onPress={() => {
            navigation.navigate(LOGIN_SCREEN_NAME);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default UserGuest;

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: PRIMARY_COLOR,
  },
  btnContainer: {
    width: '70%',
  },
});
