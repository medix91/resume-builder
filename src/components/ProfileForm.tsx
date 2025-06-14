import React, { useEffect, useState, type ChangeEvent } from "react";
import type { PersonalInfo } from "../models/types";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";

const userDocRef = doc(db, "users", "currentUser"); // adapter selon user connecté

export default function ProfileForm() {
  const [info, setInfo] = useState<PersonalInfo>({
    fullName: "",
    title: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    github: "",
    linkedin: "",
    bio: "",
    photoURL: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setInfo(docSnap.data() as PersonalInfo);
        setPhotoPreview((docSnap.data() as PersonalInfo).photoURL || "");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setInfo(prev => ({ ...prev, photoURL: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(userDocRef, info, { merge: true });
      alert("Profil enregistré !");
    } catch (error) {
      alert("Erreur lors de l'enregistrement");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-center mb-4">
          <label htmlFor="photoUpload" className="cursor-pointer">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="User"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 text-gray-400" />
            )}
          </label>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          name="fullName"
          placeholder="Nom et Prénom"
          value={info.fullName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Titre (ex: Ingénieur)"
          value={info.title}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          value={info.phone}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={info.email}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Adresse"
          value={info.address}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="website"
          placeholder="Site Web"
          value={info.website}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="github"
          placeholder="GitHub"
          value={info.github}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn"
          value={info.linkedin}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="bio"
          placeholder="Mini bio / Résumé"
          value={info.bio}
          onChange={handleChange}
          rows={4}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
