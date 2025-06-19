export default function CheckBox({ title, color, checked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span className="box-border flex items-center justify-center w-6 h-6 overflow-hidden transition-colors duration-200 rounded border-1 bg-bg-input border-borderGold">
        {checked && (
          <svg
            className="block w-4 h-4 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {color && (
        <div
          className="w-6 h-6 ml-2 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      )}
      <span className="ml-2 text-gold leading-[19px] max-sm:text-[14px] max-sm:leading-[17px]">
        {title}
      </span>
    </label>
  );
}
