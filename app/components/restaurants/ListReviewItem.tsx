import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Avatar, ListItem, Rating } from 'react-native-elements';
import { IReview } from '../../common/interfaces/common';

interface IListReviewItemProps {
  review: IReview;
}

const ListReviewItem: React.FC<IListReviewItemProps> = ({ review }) => {
  return (
    <ListItem bottomDivider>
      <Avatar
        size='large'
        rounded
        containerStyle={styles.imageAvatar}
        source={
          review.avatarUrl
            ? { uri: review.avatarUrl }
            : require('../../../assets/avatar-default.jpg')
        }
      />
      <ListItem.Content>
        <ListItem.Title>{review.title}</ListItem.Title>
        <Text>{review.comment}</Text>
        <Rating imageSize={15} startingValue={review.rating} readonly />
        <Text style={styles.reviewDate}>Date</Text>
      </ListItem.Content>
    </ListItem>
  );
};

export default ListReviewItem;

const styles = StyleSheet.create({
  imageAvatar: {
    width: 50,
    height: 50,
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
