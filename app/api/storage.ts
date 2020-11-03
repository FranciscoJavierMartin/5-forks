import {
  AVATAR_STORAGE_FOLDER_NAME,
  RESTAURANTS_STORAGE_FOLDER_NAME,
} from '../common/constants/firebase';
import { storage } from './firebase';
import uuid from 'random-uuid-v4';

export function uploadAvatar(
  userId: string,
  blob: Blob
): firebase.storage.UploadTask {
  return storage
    .ref()
    .child(`${AVATAR_STORAGE_FOLDER_NAME}/${userId}.jpg`)
    .put(blob);
}

export function uploadRestaurantPhotos(
  blob: Blob
): firebase.storage.UploadTask {
  return storage
    .ref()
    .child(`${RESTAURANTS_STORAGE_FOLDER_NAME}/${uuid()}.jpg`)
    .put(blob);
}
