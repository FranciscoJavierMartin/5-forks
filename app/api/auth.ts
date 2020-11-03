import { auth } from './firebase';
import * as firebase from 'firebase';

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  return await auth.createUserWithEmailAndPassword(email, password);
}

export async function signOut() {
  return await auth.signOut();
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  return await auth.signInWithEmailAndPassword(email, password);
}

export function getCurrentUser(): firebase.User | null {
  return auth.currentUser;
}

export function reauthenticate(
  password: string
): Promise<firebase.auth.UserCredential> {
  const user = auth.currentUser!!;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email || '',
    password
  );
  return user.reauthenticateWithCredential(credentials);
}
