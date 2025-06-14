import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // ton export firebase/firestore
import type { PersonalInfo } from "../models/types";

const docRef = doc(db, "users", "currentUser"); // adapter au user connecté

export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  const docSnap = await getDoc(doc(db, "users", "currentUser"));
  if (docSnap.exists()) return docSnap.data() as PersonalInfo;
  return null;
};


export const savePersonalInfo = async (data: any) => {
  await setDoc(docRef, data, { merge: true });
};
