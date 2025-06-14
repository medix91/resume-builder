import React, { useState, useEffect, type ChangeEvent } from "react";
import {
  FiUser,
  FiBriefcase,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiFileText,
} from "react-icons/fi";

export interface PersonalInfoData {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  github: string;
  linkedin: string;
  bio: string;
  photoFile?: File;
  photoURL?: string;
}

interface Props {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
  onSave: () => void;
}

const PersonalInfoForm: React.FC<Props> = ({ data, onChange, onSave }) => {
  const [formData, setFormData] = useState<PersonalInfoData>(data);

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        photoFile: file,
        photoURL: url,
      }));
    }
  };

  return (
    <div className="max-w-md p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Informations personnelles</h2>

      {/* Photo Upload via icon */}
      <div className="flex justify-center mb-6">
        <label
          htmlFor="photo-upload"
          className="cursor-pointer rounded-full border-4 border-gray-300 p-1 hover:border-green-500 transition"
          title="Cliquez pour ajouter ou changer la photo"
        >
          {formData.photoURL ? (
            <img
              src={formData.photoURL}
              alt="Photo de profil"
              className="w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <FiUser className="w-32 h-32 text-gray-400" />
          )}
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <FiUser className="text-gray-500" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Nom et prénom"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <FiBriefcase className="text-gray-500" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Titre (ex: Ingénieur logiciel)"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <FiPhone className="text-gray-500" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Téléphone"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <FiMail className="text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <FiMapPin className="text-gray-500" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Adresse"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <FiGlobe className="text-gray-500" />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Site web"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <FiGithub className="text-gray-500" />
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
            placeholder="GitHub"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <FiLinkedin className="text-gray-500" />
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="LinkedIn"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label className="flex items-start space-x-2">
          <FiFileText className="mt-2 text-gray-500" />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Mini bio / résumé"
            rows={3}
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </label>
      </div>

      {/* Bouton sauvegarder */}
      <div className="pt-4">
        <button
          onClick={onSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
          type="button"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
