import { useState, useEffect } from "react";
import type { Experience } from "../models/types";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../services/experienceService";

const initialState: Experience = {
  position: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function ExperienceForm() {
  const [formData, setFormData] = useState<Experience>(initialState);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getExperiences();
      setExperiences(data);
    };
    fetch();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateExperience(editingId, formData);
    } else {
      await addExperience(formData);
    }
    const updated = await getExperiences();
    setExperiences(updated);
    setFormData(initialState);
    setEditingId(null);
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id || null);
  };

  const handleDelete = async (id: string) => {
    await deleteExperience(id);
    const updated = await getExperiences();
    setExperiences(updated);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Ajouter une expérience</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Poste"
          value={formData.position}
          onChange={e => setFormData({ ...formData, position: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Entreprise"
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={formData.startDate}
          onChange={e => setFormData({ ...formData, startDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={formData.endDate}
          onChange={e => setFormData({ ...formData, endDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Expériences enregistrées</h3>
      <ul className="space-y-3">
        {experiences.map(exp => (
          <li key={exp.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{exp.position} @ {exp.company}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {exp.startDate} – {exp.endDate}
              </p>
              <p className="text-sm">{exp.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(exp)} className="text-blue-500">✏️</button>
              <button onClick={() => exp.id && handleDelete(exp.id)} className="text-red-500">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
