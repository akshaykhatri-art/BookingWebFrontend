import { Eye, EyeOff } from "lucide-react";

export default function FormInput({
  label,
  type = "text",
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  ...props
}) {
  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring pr-10"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-2 top-9 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
