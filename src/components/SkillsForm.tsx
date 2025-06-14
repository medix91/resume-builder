import React, { useEffect, useState } from "react";
import type { Skill } from "../models/types";
import {
  addSkill,
  getSkills,
  deleteSkill,
} from "../services/skillService";

const SkillsForm = () => {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const data = await getSkills();
    setSkills(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addSkill({ name });
    setName("");
    fetchSkills();
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteSkill(id);
    fetchSkills();
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Ajouter une compétence</h2>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Ex : JavaScript"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">Liste des compétences</h3>
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
