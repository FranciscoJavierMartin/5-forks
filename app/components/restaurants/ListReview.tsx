import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Rating } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import {
  ACCOUNT_SCREEN_NAME,
  ADD_REVIEW_RESTAURANT_NAME,
  LOGIN_SCREEN_NAME,
  RESTAURANT_SCREEN_NAME,
} from '../../common/constants/routes';
import { UserContext } from '../../common/context/UserProvider';
import { IUserContext } from '../../common/interfaces/states';
import { RestaurantsRootStackParamList } from '../../common/routes/restaurants';
import { db } from '../../api/firebase';
import { IReview } from '../../common/interfaces/common';
import { getReviewsByRestaurant } from '../../api/reviews';
import ListReviewItem from './ListReviewItem';

// FIXME: How to go to another stack
interface IListReviewProps {
  navigation: StackNavigationProp<
    RestaurantsRootStackParamList,
    typeof RESTAURANT_SCREEN_NAME
  >;
  id: string;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const ListReview: React.FC<IListReviewProps> = ({
  id,
  setRating,
  navigation,
}) => {
  const { user } = useContext<IUserContext>(UserContext).user;
  const [reviews, setReviews] = useState<IReview[]>([]);
  const navigatorToLogin = useNavigation();

  useEffect(() => {
    getReviewsByRestaurant(id).then((res) => {
      setReviews(
        res.docs.map(
          (r) =>
            ({
              ...r.data(),
              id: r.id,
            } as IReview)
        )
      );
    });
  }, []);

  return (
    <View>
      {user ? (
        <Button
          title='Leave a review'
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleAddReview}
          onPress={() =>
            navigation.navigate(ADD_REVIEW_RESTAURANT_NAME, {
              id,
            })
          }
          icon={{
            type: 'material-community',
            name: 'square-edit-outline',
            color: PRIMARY_COLOR,
          }}
        />
      ) : (
        <View>
          <Text
            style={styles.notLoggedText}
            onPress={() =>
              navigatorToLogin.navigate(ACCOUNT_SCREEN_NAME, {
                screen: LOGIN_SCREEN_NAME,
              })
            }
          >
            To write a review, you should be logged.{' '}
            <Text style={{ fontWeight: 'bold' }}>Tap here to login</Text>
          </Text>
        </View>
      )}
      {reviews.length === 0 ? (
        <Text>There are not reviews yet. Add yours.</Text>
      ) : (
        reviews.map((r, i) => <ListReviewItem review={r} key={i} />)
      )}
    </View>
  );
};

export default ListReview;

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: 'transparent',
  },
  btnTitleAddReview: {
    color: PRIMARY_COLOR,
  },
  notLoggedText: {
    textAlign: 'center',
    color: PRIMARY_COLOR,
    padding: 20,
  },
  viewReview: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  viewImageAvatar: {
    marginRight: 15,
  },
  imageAvatar: {
    width: 50,
    height: 50,
  },
  viewInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  reviewTitle: {
    fontWeight: 'bold',
  },
  reviewText: {
    paddingTop: 2,
    color: 'grey',
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: 'grey',
    fontSize: 12,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
