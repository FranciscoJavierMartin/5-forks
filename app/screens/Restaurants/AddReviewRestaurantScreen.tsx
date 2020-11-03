import React, { useContext, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { RESTAURANT_SCREEN_NAME } from '../../common/constants/routes';
import { RestaurantsRootStackParamList } from '../../common/routes/restaurants';
import { PRIMARY_COLOR } from '../../common/constants/colors';
import { IFormAddReview } from '../../common/interfaces/forms';
import Loading from '../../components/Loading';
import { IToastContext, IUserContext } from '../../common/interfaces/states';
import { ToastContext } from '../../common/context/ToastProvider';
import { uploadReview } from '../../api/reviews';
import { UserContext } from '../../common/context/UserProvider';
import { updateRestaurantRating } from '../../api/restaurants';

interface IAddReviewRestaurantScreenProps
  extends StackScreenProps<
    RestaurantsRootStackParamList,
    typeof RESTAURANT_SCREEN_NAME
  > {}

const AddReviewRestaurant: React.FC<IAddReviewRestaurantScreenProps> = ({
  route,
  navigation,
}) => {
  const { show } = useContext<IToastContext>(ToastContext);
  const { user } = useContext<IUserContext>(UserContext).user;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormAddReview>({
    title: '',
    comment: '',
    rating: 0,
  });
  const [errorMessages, setErrorMessages] = useState<{
    title: string;
    comment: string;
    rating: string;
  }>({
    title: '',
    comment: '',
    rating: '',
  });

  const onChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    key: keyof IFormAddReview
  ) => {
    setFormData({
      ...formData,
      [key]: event.nativeEvent.text,
    });
  };

  const handleSubmit = async () => {
    setErrorMessages({
      title: '',
      comment: '',
      rating: '',
    });

    if (!formData.title || !formData.comment || formData.rating === 0) {
      if (!formData.title) {
        setErrorMessages((previousState) => ({
          ...previousState,
          title: 'Title is required',
        }));
      }

      if (!formData.comment) {
        setErrorMessages((previousState) => ({
          ...previousState,
          comment: 'Comment is required',
        }));
      }

      if (formData.rating === 0) {
        setErrorMessages((previousState) => ({
          ...previousState,
          rating: 'Rating is required',
        }));
      }
    } else {
      setIsLoading(true);

      try {
        if (user) {
          await uploadReview({
            authorId: user.uid,
            avatarUrl: user.photoURL,
            restaurantId: route.params.id,
            title: formData.title,
            comment: formData.comment,
            rating: formData.rating,
            createdAt: new Date(),
          });
          await updateRestaurantRating(route.params.id, formData.rating);
        }
        setIsLoading(false);
        navigation.goBack();
      } catch (error) {
        setIsLoading(false);
        show({ message: 'Error on upload review' });
      }
    }
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          defaultRating={0}
          size={35}
          reviews={['Horrible', 'Bad', 'Normal', 'Good', 'Excellent']}
          onFinishRating={(value) => {
            setFormData({
              ...formData,
              rating: value,
            });
          }}
        />
        {errorMessages.rating !== '' && (
          <Text style={styles.errorMessageRating}>{errorMessages.rating}</Text>
        )}
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder='Title'
          containerStyle={styles.input}
          onChange={(e) => onChange(e, 'title')}
          errorMessage={errorMessages.title}
        />
        <Input
          placeholder='Comment'
          inputContainerStyle={styles.textArea}
          onChange={(e) => onChange(e, 'comment')}
          errorMessage={errorMessages.comment}
          multiline
        />
        <Button
          title='Send Review'
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={handleSubmit}
        />
      </View>
      <Loading isVisible={isLoading} text='Adding review' />
    </View>
  );
};

export default AddReviewRestaurant;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewRating: {
    height: 110,
    backgroundColor: '#f2f2f2',
    paddingLeft: 20,
    paddingRight: 20,
  },
  errorMessageRating: {
    color: 'red',
    fontSize: 11,
    paddingLeft: 5,
    paddingTop: 5,
  },
  formReview: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 10,
    width: '95%',
  },
  btn: {
    backgroundColor: PRIMARY_COLOR,
  },
});
