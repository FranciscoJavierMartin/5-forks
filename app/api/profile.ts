import { auth } from './firebase';

export async function updateUserPhoto(photoURL: string): Promise<void> {
  return await auth.currentUser?.updateProfile({
    photoURL,
  });
}

export async function updateUserDisplayName(
  displayName: string
): Promise<void> {
  return await auth.currentUser?.updateProfile({
    displayName,
  });
}

export async function updateUserEmail(email: string): Promise<void> {
  return await auth.currentUser?.updateEmail(email);
}

export async function updatePassword(newPassword: string): Promise<void> {
  return await auth.currentUser?.updatePassword(newPassword);
}
