import { useState } from "react";
import ProfileWants from "./ProfileWants";
import ProfileHistory from "./ProfileHistory";
import ProfileDecks from "./ProfileDecks";
import ProfileFriends from "./ProfileFriends";

export default function ProfileSelector() {
  const [activeTab, setActiveTab] = useState("decks");

  const tabs = [
    { id: "decks", label: "Mes decks", shortLabel: "Decks" },
    {
      id: "historique",
      label: "Historique de transaction",
      shortLabel: "Historique",
    },
    { id: "souhaits", label: "Mes souhaits", shortLabel: "Souhaits" },
    { id: "amis", label: "Amis", shortLabel: "Amis" },
  ];

  return (
    <div className='w-full '>
      {/* onglets */}
      <div className='flex gap-6 mb-6 overflow-x-auto border-b-2 scrollbar-hide sm:justify-between border-b-borderGold'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-lg font-semibold transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-gold border-b-3 border-borderGold"
                : "text-white hover:text-gold"
            }`}
          >
            <span className='block sm:hidden'>{tab.shortLabel}</span>
            <span className='hidden sm:block'>{tab.label}</span>
          </button>
        ))}
      </div>
      {/* contenu dynamique */}
      <div className='p-6 text-white bg-gray-800 rounded-lg shadow'>
        {activeTab === "decks" && <ProfileDecks />}
        {activeTab === "historique" && <ProfileHistory />}
        {activeTab === "souhaits" && <ProfileWants />}
        {activeTab === "amis" && <ProfileFriends />}
      </div>
    </div>
  );
}
