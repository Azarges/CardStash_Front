import { useEffect, useState } from "react";
import CheckBox from "../shared/CheckBox";

export default function CustomColorsInput({ value = [], onChange }) {
  const colors = [
    { title: "White", color: "#fefefe", label: "W" },
    { title: "Blue", color: "#0000ff", label: "U" },
    { title: "Black", color: "#000000", label: "B" },
    { title: "Red", color: "#ff0000", label: "R" },
    { title: "Green", color: "#00ff00", label: "G" },
    { title: "Colorless", color: "#7f7f7f", label: "C" },
  ];

  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggle = (label) => {
    let newSelected;
    if (label === "C") {
      newSelected = selected.includes("C") ? [] : ["C"];
    } else {
      newSelected = selected.includes(label)
        ? selected.filter((t) => t !== label)
        : [...selected.filter((t) => t !== "C"), label];
    }

    setSelected(newSelected);
    onChange && onChange(newSelected);
  };

  return (
    <div className="flex flex-col w-100 max-lg:w-75 max-sm:w-full gap-2.5">
      <div className="w-100 h-[128px] grid grid-cols-2 grid-rows-3 gap-2 max-sm:w-full max-md:w-75">
        {colors.map(({ title, color, label }) => (
          <CheckBox
            key={title}
            title={title}
            color={color}
            checked={selected.includes(label)}
            onChange={() => toggle(label)}
          />
        ))}
      </div>
      <p className="text-placeholder text-[13px] leading-[16px]">
        Sélectionnez une ou plusieurs couleurs.
      </p>
    </div>
  );
}
