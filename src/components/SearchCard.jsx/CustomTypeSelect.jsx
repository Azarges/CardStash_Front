import { useState, useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CustomTypeSelect({
  datasets,
  value,
  onChange,
  placeholder = "Choisir...",
}) {
  const [openGroup, setOpenGroup] = useState(null);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenGroup(null); // Ferme le menu si on clique à l'extérieur
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fonction pour ajouter ou supprimer un type
  const toggleOption = (option) => {
    const exists = value.some((val) => val === option); // Vérifie si l'option est déjà sélectionnée
    if (exists) {
      onChange(value.filter((val) => val !== option)); // Supprime l'option si elle est déjà dans la sélection
    } else {
      onChange([...value, option]); // Ajoute l'option si elle n'est pas encore dans la sélection
    }
  };

  // Supprimer une option spécifique
  const removeOption = (option) => {
    onChange(value.filter((val) => val !== option)); // Supprime l'option de la liste
  };

  // Effacer toutes les options sélectionnées
  const clearAll = () => {
    onChange([]); // Vide toutes les options sélectionnées
  };

  // Filtrer les options en fonction de la recherche et des éléments déjà sélectionnés
  const filteredOptions = (options) =>
    options
      .filter((opt) => opt.toLowerCase().includes(search.toLowerCase())) // Filtre selon la recherche
      .filter((opt) => !value.includes(opt)); // Exclut les options déjà sélectionnées

  return (
    <div className="relative w-100 max-lg:w-75 max-sm:w-full" ref={ref}>
      {/* Select Box */}
      <div
        className="w-full min-h-[35px] p-2.5 rounded-[5px] text-white bg-bg-input border-1 border-borderGold cursor-pointer flex items-center justify-between gap-2"
        onClick={() => setOpenGroup(openGroup ? null : "all")}
      >
        <div
          className="flex flex-wrap items-center flex-1 gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {value.length === 0 ? (
            <span className="text-placeholder">{placeholder}</span>
          ) : (
            value.map((val) => (
              <span
                key={val}
                className="flex items-center px-2 py-1 text-sm bg-cyan-900/10 text-white rounded-[4px]"
              >
                {val}
                <FaXmark
                  className="w-4 h-4 ml-1 cursor-pointer text-gold hover:text-light-red"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(val); // Supprime l'option spécifique
                  }}
                />
              </span>
            ))
          )}
        </div>

        <div
          className="flex items-center gap-2 ml-2"
          onClick={(e) => e.stopPropagation()}
        >
          {value.length > 0 && (
            <FaXmark
              className="w-4 h-4 cursor-pointer text-gold hover:text-light-red"
              onClick={(e) => {
                e.stopPropagation();
                clearAll(); // Efface toutes les options
              }}
              title="Tout supprimer"
            />
          )}
          <ChevronDownIcon
            className="w-5 h-5 cursor-pointer text-gold"
            onClick={() => setOpenGroup(openGroup ? null : "all")}
          />
        </div>
      </div>

      {/* Dropdown */}
      {openGroup && (
        <div className="absolute z-10 w-full bg-bg-input border-1 border-borderGold rounded-[5px] shadow max-h-72 overflow-y-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-3 py-2 text-white border-b outline-none bg-bg-input border-borderGold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Affichage des groupes d'options */}
          {datasets.map((dataset, index) => {
            const groupLabel = dataset.name || `Groupe ${index + 1}`;
            const filteredData = filteredOptions(dataset.data); // Filtre les options déjà sélectionnées

            return (
              <>
                {filteredData.length === 0 ? null : (
                  <div key={groupLabel}>
                    <div className="p-2 font-semibold text-gold border-y-1 border-borderGold bg-bg-section font-title">
                      {groupLabel}
                    </div>
                    {filteredData.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleOption(option)} // Ajoute ou supprime l'option
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-borderGold/20"
                      >
                        <span className="text-white">{option}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
