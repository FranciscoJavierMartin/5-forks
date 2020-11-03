import { REVIEWS_COLLECTION_NAME } from '../common/constants/firebase';
import { IReview } from '../common/interfaces/common';
import { db } from './firebase';

export async function uploadReview(
  payload: IReview
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> {
  return await db.collection(REVIEWS_COLLECTION_NAME).add(payload);
}

export function getReviewsByRestaurant(restaurantId: string) {
  return db
    .collection('reviews')
    .where('restaurantId', '==', restaurantId)
    .get();
}
