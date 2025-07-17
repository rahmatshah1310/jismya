import { useState } from "react";
import Button from "./Button";

//inputprops interface removed
const InputField = ({
  label,
  placeholder,
  inputClassname,
  name,
  type = "text",
  icon: Icon,
  size = 18,
  color = "#555",
  error,
  register,
  isPassword = false,
  ...rest
}) => {
  const [selectedType, setSelectedType] = useState(type);

  return (
    <div className="space-y-2">
      <div className="relative w-full">
        <input
          {...register}
          {...rest}
          type={selectedType}
          id={name}
          name={name}
          placeholder={placeholder ?? ""}
          className={`peer block py-2 w-full appearance-none border bg-transparent text-sm text-white border-[#555555] focus:outline-none focus:ring-0 focus:border-[#555555] ${inputClassname}`}
        />
        {Icon && (
          <Icon
            className="absolute top-1/2 -translate-y-1/2 left-3"
            size={size}
            color={color}
          />
        )}
        {isPassword && (
          <Button
            onClick={() =>
              setSelectedType(selectedType === "password" ? "text" : "password")
            }
            className="absolute top-1/2 -translate-y-1/2 right-3"
          >
            {selectedType === "password" ? "Show" : "Hide"}
          </Button>
        )}
        <label htmlFor={name}>{label}</label>
      </div>
      {/* {error && <ErrorMessage error={error} />} */}
    </div>
  );
};

export default InputField;
