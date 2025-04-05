import { auth } from './firebase';
import {
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  // sendPasswordResetEmail,
  // sendEmailVerification,
  // updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// export const doSignInWithEmailAndPassword = (email: string, password: string) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

export const signInWithGoogleFirebase = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const signOutFirebase = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
