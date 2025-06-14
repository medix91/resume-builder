import { useEffect, useState } from "react";
import { getPersonalInfo } from "../services/firebaseService";
import { getEducations } from "../services/educationService";
import { getExperiences } from "../services/experienceService";
import { getSkills } from "../services/skillService";
import type { PersonalInfo, Education, Experience, Skill } from "../models/types";

const Preview = () => {
  const [info, setInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedInfo = await getPersonalInfo();
      const fetchedEducation = await getEducations();
      const fetchedExperiences = await getExperiences();
      const fetchedSkills = await getSkills();

      setInfo(fetchedInfo as PersonalInfo);
      setEducation(fetchedEducation);
      setExperiences(fetchedExperiences);
      setSkills(fetchedSkills);
    };

    fetchData();
  }, []);

  if (!info) return <div className="text-center py-10">Chargement du CV...</div>;

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-10">
      <div className="bg-white w-[210mm] h-[297mm] shadow-lg p-10 text-gray-800 overflow-auto rounded">
        {/* Photo et titre */}
        <div className="flex flex-col items-center mb-6">
          {info.photoURL && (
            <img
              src={info.photoURL}
              alt="Profil"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
            />
          )}
          <h1 className="text-3xl font-bold">{info.fullName}</h1>
          <h2 className="text-xl text-gray-600">{info.title}</h2>
        </div>

        {/* Contact */}
        <div className="text-center text-sm mb-8">
          <p>{info.email}</p>
          <p>{info.phone}</p>
          <p>{info.address}</p>
        </div>

        {/* Expériences */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold border-b pb-1 mb-2">Expériences</h3>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-2">
                <p className="font-bold">{exp.position} — {exp.company}</p>
                <p className="text-sm text-gray-600">{exp.startDate} → {exp.endDate}</p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Formation */}
        {education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold border-b pb-1 mb-2">Diplômes & Certifications</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="font-bold">{edu.title} — {edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} → {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold border-b pb-1 mb-2">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Preview;
