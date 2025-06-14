import React, { useState, useEffect } from "react";
import EducationForm from "../components/EducationForm";
import type { Education } from "../models/types";
import { getEducations, addEducation, updateEducation, deleteEducation } from "../services/educationService";

export default function Education() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Education | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadEducations = async () => {
    const data = await getEducations();
    setEducations(data);
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleSave = async (data: Omit<Education, "id">) => {
    if (editing) {
      await updateEducation(editing.id!, data);
    } else {
      await addEducation(data);
    }
    setEditing(null);
    setShowForm(false);
    loadEducations();
  };

  const handleEdit = (edu: Education) => {
    setEditing(edu);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteEducation(id);
    loadEducations();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Mes diplômes et certifications</h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ajouter un diplôme
        </button>
      )}

      {showForm && (
        <EducationForm
          initialData={editing || undefined}
          onSave={handleSave}
          onCancel={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      )}

      <ul className="mt-6 space-y-4">
        {educations.map((edu) => (
          <li key={edu.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{edu.title}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500 text-sm">
                {edu.startDate} - {edu.endDate || "En cours"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(edu)}
                className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(edu.id!)}
                className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
