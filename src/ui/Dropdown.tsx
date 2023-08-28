import React from "react";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; id: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleSelectChange}>
      <option value="none">Select</option>
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
