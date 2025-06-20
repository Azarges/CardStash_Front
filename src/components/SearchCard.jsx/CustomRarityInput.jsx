import { useEffect, useState } from "react";
import CheckBox from "../shared/CheckBox";

export default function CustomRarityInput({
  value = [],
  onChange,
  placeholder,
}) {
  const colors = [
    { title: "Communes", label: "c" },
    { title: "Peu communes", label: "u" },
    { title: "Rares", label: "r" },
    { title: "Mythiques", label: "m" },
  ];

  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggle = (label) => {
    const newSelected = selected.includes(label)
      ? selected.filter((t) => t !== label)
      : [...selected, label];

    setSelected(newSelected);
    onChange && onChange(newSelected);
  };

  return (
    <div className="flex flex-col w-100 max-lg:w-75 max-sm:w-full gap-2.5">
      <div className="w-100 h-[66px] grid grid-cols-2 grid-rows-2 gap-2 max-sm:w-full max-md:w-75">
        {colors.map(({ title, label }) => (
          <CheckBox
            key={title}
            title={title}
            checked={selected.includes(label)}
            onChange={() => toggle(label)}
          />
        ))}
      </div>
      <p className="text-placeholder text-[13px] leading-[16px]">
        {placeholder}
      </p>
    </div>
  );
}
