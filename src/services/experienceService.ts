import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Experience } from "../models/types";

const experienceRef = collection(db, "experiences");

export const getExperiences = async (): Promise<Experience[]> => {
  const snapshot = await getDocs(experienceRef);
  return snapshot.docs.map(doc => {
    const data = doc.data() as Experience;
    return { id: doc.id, ...data };
  });
};

export const addExperience = async (data: Experience) => {
  await addDoc(experienceRef, data as Record<string, any>);
};


export const updateExperience = async (id: string, data: Experience) => {
  const ref = doc(db, "experiences", id);
  await updateDoc(ref, data as Record<string, any>);
};


export const deleteExperience = async (id: string) => {
  const ref = doc(db, "experiences", id);
  await deleteDoc(ref);
};
