import { FireSQL } from 'firesql';
import { auth, db } from './firebase';
import {
  RESTAURANTS_COLLECTION_NAME,
  RESTAURANTS_PER_PAGE,
  TOP_RESTAURANTS,
} from '../common/constants/firebase';
import { IRestaurant, IRestaurantToCreate } from '../common/interfaces/common';

const fireSQL = new FireSQL(db, { includeId: 'id' });

export function addRestaurant(
  restaurantData: IRestaurantToCreate
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> {
  return db.collection(RESTAURANTS_COLLECTION_NAME).add({
    name: restaurantData.name,
    address: restaurantData.address,
    description: restaurantData.description,
    location: restaurantData.location,
    images: restaurantData.images,
    rating: 0,
    ratingTotal: 0,
    votes: 0,
    createAt: new Date(),
    createdBy: auth.currentUser?.uid,
  });
}

export async function getTotalRestaurants(): Promise<number> {
  return (await db.collection(RESTAURANTS_COLLECTION_NAME).get()).size;
}

export async function getInitialRestaurants() {
  const response = await db
    .collection(RESTAURANTS_COLLECTION_NAME)
    .orderBy('createAt', 'desc')
    .limit(RESTAURANTS_PER_PAGE)
    .get();

  return {
    startRestaurant: {
      ...response.docs[response.docs.length - 1].data(),
      id: response.docs[response.docs.length - 1].id,
    },
    restaurants: response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })),
  };
}

export async function getMoreRestaurants(fromWhere: Date) {
  const response = await db
    .collection(RESTAURANTS_COLLECTION_NAME)
    .orderBy('createAt', 'desc')
    .startAfter(fromWhere)
    .limit(RESTAURANTS_PER_PAGE)
    .get();

  return {
    startRestaurant: {
      ...response.docs[response.docs.length - 1].data(),
      id: response.docs[response.docs.length - 1].id,
    },
    restaurants: response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })),
  };
}

export async function getRestaurantById(id: string) {
  return await db.collection(RESTAURANTS_COLLECTION_NAME).doc(id).get();
}

// FIXME: Better do on firebase functions
export async function updateRestaurantRating(
  id: string,
  rating: number
): Promise<void> {
  const restaurantRef = db.collection(RESTAURANTS_COLLECTION_NAME).doc(id);
  restaurantRef.get().then((res) => {
    const restaurantData: any = res.data();
    const ratingTotal = restaurantData.ratingTotal + rating;
    const quantityVoting = restaurantData.votes + 1;
    const ratingResult = ratingTotal / quantityVoting;

    return restaurantRef.update({
      rating: ratingResult,
      ratingTotal,
      votes: quantityVoting,
    });
  });
}

export async function getTopRestaurants(): Promise<IRestaurant[]> {
  const response = await db
    .collection(RESTAURANTS_COLLECTION_NAME)
    .orderBy('rating', 'desc')
    .limit(TOP_RESTAURANTS)
    .get();

  return response.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as IRestaurant)
  );
}

export async function getSearchRestaurants(searchText: string) {
  return await fireSQL.query(
    `SELECT * FROM restaurants WHERE name LIKE '${searchText}%'`
  );
}
