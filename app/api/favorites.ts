import {
  FAVORITES_COLLECTION_NAME,
  RESTAURANTS_COLLECTION_NAME,
} from '../common/constants/firebase';
import { IRestaurant } from '../common/interfaces/common';
import { db } from './firebase';

export function addFavorite(userId: string, restaurantId: string) {
  return db.collection(FAVORITES_COLLECTION_NAME).add({
    userId,
    restaurantId,
  });
}

export async function removeFavorite(restaurantId: string, userId: string) {
  return db
    .collection(FAVORITES_COLLECTION_NAME)
    .where('restaurantId', '==', restaurantId)
    .where('userId', '==', userId)
    .get()
    .then((response) => {
      response.forEach((doc) => {
        db.collection(FAVORITES_COLLECTION_NAME).doc(doc.id).delete();
      });
    });
}

export function getIfRestaurantExists(restaurantId: string, userId: string) {
  return db
    .collection(FAVORITES_COLLECTION_NAME)
    .where('restaurantId', '==', restaurantId)
    .where('userId', '==', userId)
    .get();
}

export async function getFavoritesByUserId(
  userId: string
): Promise<IRestaurant[]> {
  const favorites = await db
    .collection(FAVORITES_COLLECTION_NAME)
    .where('userId', '==', userId)
    .get();
  const restaurantsIds: string[] = favorites.docs.map(
    (doc) => doc.data().restaurantId
  );
  return Promise.all(
    restaurantsIds.map<Promise<IRestaurant>>(async (id) => {
      const res = await db
        .collection(RESTAURANTS_COLLECTION_NAME)
        .doc(id)
        .get();
      return {
        ...res.data(),
        id: res.id,
      } as IRestaurant;
    })
  );
}
