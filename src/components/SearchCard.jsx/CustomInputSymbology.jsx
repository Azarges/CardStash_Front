import { useState, useRef, useEffect } from "react";

export default function CustomInputSymbology({ options, onChange, value }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fermer dropdown si clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleOptionSelect = (option) => {
    const updatedValue = (value || "") + option.symbol;
    onChange(updatedValue);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="relative flex items-center w-100 max-lg:w-75 max-sm:w-full"
    >
      <input
        type="text"
        value={value || ""}
        placeholder='Exemple: "Draw a card"'
        onChange={handleInputChange}
        className="w-full h-[35px] p-2.5 text-white rounded-l-[5px] bg-bg-input border-1 border-borderGold"
      />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="h-[35px] px-3 text-gold bg-bg-input border-1 border-borderGold rounded-r-[5px] w-1/5 min-w-10 hover:text-gold/80 cursor-pointer"
      >
        ▼
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-1 overflow-auto rounded-[5px] border-1 border-borderGold bg-bg-input text-white w-full max-h-48 top-full">
          {options.map((opt) => (
            <div
              key={opt.symbol}
              onClick={() => handleOptionSelect(opt)}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gold/20 "
            >
              <img src={opt.icon} alt={opt.symbol} className="w-5 h-5" />
              <span>{opt.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
