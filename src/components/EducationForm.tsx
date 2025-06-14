import React, { useState, useEffect } from "react";
import type { Education } from "../models/types";

interface Props {
  initialData?: Education;
  onSave: (data: Omit<Education, "id">) => void;
  onCancel?: () => void;
}

export default function EducationForm({ initialData, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [institution, setInstitution] = useState(initialData?.institution || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, institution, startDate, endDate, description });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">{initialData ? "Modifier" : "Ajouter"} un diplôme</h2>

      <label className="block mb-2 font-medium">Titre</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-medium">Établissement</label>
      <input
        type="text"
        value={institution}
        onChange={e => setInstitution(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-medium">Date de début</label>
      <input
        type="month"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-medium">Date de fin</label>
      <input
        type="month"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enregistrer
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
