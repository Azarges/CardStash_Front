export default function Button({
  txt = "Bouton",
  onClick = () => {},
  variant = "default",
}) {
  if (variant === "default") {
    return (
      <button
        className="w-full flex cursor-pointer bg-gold  border-[1px] border-borderClassic rounded-[5px] px-4 py-2.5 hover:bg-bg-input hover:border-gold text-bg-input hover:text-gold justify-center items-center"
        onClick={onClick}
      >
        <div className="font-semibold leading-[19px] ">{txt}</div>
      </button>
    );
  } else {
    return (
      <button
        className="w-full flex cursor-pointer bg-red  border-[1px] border-gold rounded-[5px] px-4 py-2.5 hover:bg-darkred text-white hover:text-gold justify-center items-center"
        onClick={onClick}
      >
        <div className="font-semibold leading-[19px] ">{txt}</div>
      </button>
    );
  }
}
