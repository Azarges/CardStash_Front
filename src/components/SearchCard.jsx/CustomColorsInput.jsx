import { useState } from "react";
import CheckBox from "../shared/CheckBox";

export default function CustomColorsInput() {
  const colors = [
    { title: "White", color: "#fefefe" },
    { title: "Blue", color: "#0000ff" },
    { title: "Black", color: "#000000" },
    { title: "Red", color: "#ff0000" },
    { title: "Green", color: "#00ff00" },
    { title: "Colorless", color: "#7f7f7f" },
  ];

  const [selected, setSelected] = useState([]);

  const toggle = (title) => {
    if (title === "Colorless") {
      // Si on coche "Colorless" : on désélectionne tout sauf "Colorless"
      if (selected.includes("Colorless")) {
        // si déjà coché, on décoche "Colorless"
        setSelected([]);
      } else {
        setSelected(["Colorless"]);
      }
    } else {
      // Sinon, on coche/décoche la couleur normale
      let newSelected;
      if (selected.includes(title)) {
        // Décoche
        newSelected = selected.filter((t) => t !== title);
      } else {
        // Coche : on retire "Colorless" si présent + on ajoute la couleur
        newSelected = [...selected.filter((t) => t !== "Colorless"), title];
      }
      setSelected(newSelected);
    }
  };

  return (
    <div className="flex flex-col w-[600px] gap-2.5">
      <div className="w-100 h-[128px] grid grid-cols-2 grid-rows-3 gap-2">
        {colors.map(({ title, color }) => (
          <CheckBox
            key={title}
            title={title}
            color={color}
            checked={selected.includes(title)}
            onChange={() => toggle(title)}
          />
        ))}
      </div>
      <p className="text-white">Sélectionnez une ou plusieurs couleurs.</p>
      <div className="mt-4 text-white">
        Sélectionnés : {selected.length > 0 ? selected.join(", ") : "aucun"}
      </div>
    </div>
  );
}
