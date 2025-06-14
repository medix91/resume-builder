
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function EditCV() {
  const [activeSection, setActiveSection] = useState("Informations");

  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} onSelectSection={setActiveSection} />
      <main className="flex-1 p-8 ml-48 min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">{activeSection}</h1>
        {/*  formulaire pour la section active */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
          <p>Formulaire {activeSection} à construire ici.</p>
        </div>
      </main>
    </div>
  );
}
