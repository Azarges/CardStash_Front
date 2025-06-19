import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaXmark } from "react-icons/fa6";
export default function CustomMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Choisir...",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const exists = value.some((val) => val.value === option.value);
    if (exists) {
      onChange(value.filter((val) => val.value !== option.value));
    } else {
      onChange([...value, option]);
    }
  };

  const removeOption = (option) => {
    onChange(value.filter((val) => val.value !== option.value));
  };

  const clearAll = () => {
    onChange([]);
  };

  const filteredOptions = options.filter(
    (opt) =>
      !value.some((val) => val.value === opt.value) &&
      opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-100 max-lg:w-75 max-sm:w-full" ref={ref}>
      {/* Select Box */}
      <div
        className="w-full min-h-[35px] p-2.5 rounded-[5px] text-white bg-bg-input border-1 border-borderGold cursor-pointer flex items-center justify-between gap-2"
        onClick={() => setOpen(!open)}
      >
        {/* Left side: selected values */}
        <div
          className="flex flex-wrap items-center flex-1 gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {value.length === 0 ? (
            <span className="text-placeholder">{placeholder}</span>
          ) : (
            value.map((val) => (
              <span
                key={val.value}
                className="flex items-center px-2 py-1 text-sm bg-cyan-900/10 text-white rounded-[4px]"
              >
                <img
                  src={val.icon}
                  alt={val.label}
                  className="w-4 h-4 mr-4 invert"
                />
                {val.label}
                <FaXmark
                  className="w-4 h-4 ml-1 cursor-pointer text-gold hover:text-light-red"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(val);
                  }}
                />
              </span>
            ))
          )}
        </div>

        {/* Right side: icons */}
        <div
          className="flex items-center gap-2 ml-2"
          onClick={(e) => e.stopPropagation()}
        >
          {value.length > 0 && (
            <FaXmark
              className="w-4 h-4 cursor-pointer text-gold hover:text-light-red"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              title="Tout supprimer"
            />
          )}
          <ChevronDownIcon
            className="w-5 h-5 cursor-pointer text-gold"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 w-full bg-bg-input border-1 border-borderGold rounded-[5px] shadow max-h-72 overflow-y-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-3 py-2 text-white border-b outline-none bg-bg-input border-borderGold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-sm text-placeholder">Aucune option</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => toggleOption(option)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-borderGold/20"
              >
                <img
                  src={option.icon}
                  alt={option.label}
                  className="w-4 h-4 invert"
                />
                <span className="text-white">
                  {option.label} ({option.code.toUpperCase()})
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
