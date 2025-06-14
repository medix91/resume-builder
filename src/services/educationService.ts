import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Education } from "../models/types";

const educationCollectionRef = collection(db, "users", "currentUser", "education");

export const getEducations = async (): Promise<Education[]> => {
  const snapshot = await getDocs(educationCollectionRef);
  return snapshot.docs.map(doc => {
    const data = doc.data() as Education;
    return { id: doc.id, ...data };
  });
};


export const addEducation = async (education: Omit<Education, "id">) => {
  await addDoc(educationCollectionRef, education);
};

export const updateEducation = async (id: string, education: Partial<Education>) => {
  const docRef = doc(db, "users", "currentUser", "education", id);
  await updateDoc(docRef, education);
};

export const deleteEducation = async (id: string) => {
  const docRef = doc(db, "users", "currentUser", "education", id);
  await deleteDoc(docRef);
};
