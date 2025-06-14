

interface SidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
}

const sections = [
  "Informations",
  "Compétences",
  "Expériences",
  "Langues",
  "Hobbies",
  "Diplômes",
  "Aperçu",
];

export default function Sidebar({ activeSection, onSelectSection }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-48 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSelectSection(section)}
          className={`py-2 px-3 rounded ${
            activeSection === section ? "bg-blue-500 text-white" : "hover:bg-blue-200 dark:hover:bg-gray-700"
          }`}
        >
          {section}
        </button>
      ))}
    </aside>
  );
}
