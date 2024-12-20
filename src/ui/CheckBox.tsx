import { CheckboxProps } from "../interfaces";

function CheckBox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="inline-flex items-center font-semibold cursor-pointer gap-2 md:gap-4">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0 absolute"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-4 h-4 rounded-md flex items-center justify-center transition-all duration-300 ${
          checked ? "bg-[#5964E0]" : "bg-[#e0e0e0]"
        } relative`}
      >
        {/* <div
          className={`absolute left-1 top-0.5 w-2.5 h-4 border-2 border-white transform rotate-45 transition-opacity duration-300 ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        /> */}
      </div>
      <span className="ml-2 text-xs">
        {label} <span className="hidden md:inline">Only</span>
      </span>
    </label>
  );
}

export default CheckBox;
