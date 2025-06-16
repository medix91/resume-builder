import React, { useEffect, useState } from "react";
import type { Skill } from "../models/types";
import {
  addSkill,
  getSkills,
  deleteSkill,
} from "../services/skillService";

const SkillsForm = () => {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);        // Compétences chargées depuis Firebase
  const [localSkills, setLocalSkills] = useState<Skill[]>([]); // Compétences ajoutées localement avant envoi

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const data = await getSkills();
    setSkills(data);
  };

  // Ajoute une compétence à la liste locale (si pas déjà présente)
  const addLocalSkill = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    // Vérifie doublon dans localSkills
    if (localSkills.some(s => s.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert("Cette compétence est déjà dans la liste locale");
      return;
    }

    // Ajoute localement
    setLocalSkills([...localSkills, { name: trimmedName }]);
    setName("");
  };

  // Envoie toutes les compétences locales à Firebase
  const saveAllSkills = async () => {
    if (localSkills.length === 0) return alert("Aucune compétence à enregistrer");

    try {
      for (const skill of localSkills) {
        await addSkill(skill);
      }
      setLocalSkills([]);
      fetchSkills();  // recharge la liste globale
      alert("Compétences enregistrées avec succès !");
    } catch (error) {
      alert("Erreur lors de l'enregistrement : " + error);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteSkill(id);
    fetchSkills();
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Ajouter une compétence</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Ex : JavaScript"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={addLocalSkill}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter à la liste
        </button>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={saveAllSkills}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={localSkills.length === 0}
        >
          Enregistrer les compétences
        </button>
      </div>

      {localSkills.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">Compétences à enregistrer</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {localSkills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">Liste des compétences enregistrées</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full dark:bg-blue-900 dark:text-white"
          >
            <span className="mr-2">{skill.name}</span>
            <button
              onClick={() => handleDelete(skill.id)}
              className="text-red-500 hover:text-red-700 font-bold"
              title="Supprimer"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
