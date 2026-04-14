import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, database } from "./fireBase";

const googleProvider = new GoogleAuthProvider();

// --- Google Login Function ---
export const loginWithGoogle = async () => { 
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

 
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

  
    if (!snapshot.exists()) {
      await set(userRef, {
        userName: user.displayName || "Google User",
        email: user.email,
        profilePic: user.photoURL || "",
        createdAt: new Date().toISOString(),
      });
    }
    return user;
  } catch (error: any) {
    console.error("Firebase Auth Error:", error.code);
    throw error;
  }
};

// --- Email Signup ---
export const signupUser = async (userName: string, email: string, password: string) => { 
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  await set(ref(database, `users/${userCredential.user.uid}`), {
    userName,
    email,
    createdAt: new Date().toISOString(),
  });
  return userCredential.user;
};

// --- Email Login ---
export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// --- Logout ---
export const logoutUser = () => signOut(auth);