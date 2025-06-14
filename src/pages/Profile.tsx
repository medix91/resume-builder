import ProfileForm from "../components/ProfileForm";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
  
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-900 dark:text-gray-100">
          Profil utilisateur
        </h1>

        <ProfileForm />
 
    </div>
  );
}
