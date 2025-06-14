import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import type { Skill } from "../models/types";

const skillsCollection = collection(db, "skills");

export const getSkills = async (): Promise<Skill[]> => {
  const snapshot = await getDocs(skillsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Skill[];
};

export const addSkill = async (data: Skill) => {
  await addDoc(skillsCollection, data);
};

export const updateSkill = async (id: string, data: Skill) => {
  const ref = doc(db, "skills", id);
  await updateDoc(ref, data as Record<string, any>);
};

export const deleteSkill = async (id: string) => {
  const ref = doc(db, "skills", id);
  await deleteDoc(ref);
};
