import { useEffect, useRef, useState } from "react";
import { getPersonalInfo } from "../services/firebaseService";
import { getEducations } from "../services/educationService";
import { getExperiences } from "../services/experienceService";
import { getSkills } from "../services/skillService";
import type { PersonalInfo, Education, Experience, Skill } from "../models/types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";

const Preview = () => {
  const [info, setInfo] = useState<PersonalInfo | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const infoData = await getPersonalInfo();
      setInfo(infoData as PersonalInfo);
      const edu = await getEducations();
      setEducations(edu);
      const exp = await getExperiences();
      setExperiences(exp);
      const sk = await getSkills();
      setSkills(sk);
    };
    fetchData();
  }, []);

  const generatePDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("cv.pdf");
  };

  if (!info) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-2 md:px-8 py-4 md:py-8 print:bg-white print:p-0">
      <div className="w-full flex justify-center items-start">
        <div
          ref={previewRef}
          className="origin-top scale-[0.25] sm:scale-[0.5] md:scale-100"
          style={{
            width: "794px",
            minHeight: "1122px",
            transformOrigin: "top center",
          }}
        >
          <div className="bg-white p-6 shadow print:shadow-none w-[794px]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start border-b pb-4 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{info.fullName}</h1>
                <h2 className="text-xl text-gray-600">{info.title}</h2>

                {/* Contact Info */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-700">
                  {info.github && (
                    <div className="flex items-center gap-1">
                      <FaGithub className="text-gray-500" />
                      <span>{info.github}</span>
                    </div>
                  )}
                  {info.linkedin && (
                    <div className="flex items-center gap-1">
                      <FaLinkedin className="text-blue-600" />
                      <span>{info.linkedin}</span>
                    </div>
                  )}
                  {info.website && (
                    <div className="flex items-center gap-1">
                      <FaGlobe className="text-green-600" />
                      <span>{info.website}</span>
                    </div>
                  )}
                  {info.email && (
                    <div className="flex items-center gap-1">
                      <FaEnvelope className="text-red-500" />
                      <span>{info.email}</span>
                    </div>
                  )}
                  {info.phone && (
                    <div className="flex items-center gap-1">
                      <FaPhone className="text-gray-500" />
                      <span>{info.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {info.photoURL && (
                <img
                  src={info.photoURL}
                  alt="Photo de profil"
                  className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
                />
              )}
            </div>

            {/* Two-column layout */}
            <div className="mt-6 grid grid-cols-3 gap-6">
              {/* LEFT COLUMN: SKILLS & EDUCATION */}
              <div className="space-y-6 col-span-1 w-full">
                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                    Compétences
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                    Formations
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {educations.map((edu) => (
                      <li key={edu.id}>
                        <p className="font-semibold">{edu.title}</p>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500 text-xs">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT COLUMN: EXPERIENCES */}
              <div className="space-y-6 col-span-2 w-full">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                    Expériences Professionnelles
                  </h3>
                  <ul className="space-y-4 text-sm">
                    {experiences.map((exp) => (
                      <li key={exp.id}>
                        <p className="font-semibold">{exp.position}</p>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-gray-500 text-xs">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        {exp.description && (
                          <p className="mt-1 text-gray-700 text-sm">
                            {exp.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Button */}
      <div className="max-w-4xl mx-auto mt-6 flex justify-end">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          type="button"
        >
          Télécharger PDF
        </button>
      </div>
    </div>
  );
};

export default Preview;
