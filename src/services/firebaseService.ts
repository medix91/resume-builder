import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // ton export firebase/firestore

const docRef = doc(db, "users", "currentUser"); // adapter au user connecté

export const getPersonalInfo = async () => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
};

export const savePersonalInfo = async (data: any) => {
  await setDoc(docRef, data, { merge: true });
};
