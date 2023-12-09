import React from "react";

const ComboBox = ({ options, label, onOptionChange }) => {
  const handleChange = (event) => {
    onOptionChange(event.target.value);
  };

  return (
    <>
      <div className="form-floating">
        <select
          className="form-select"
          aria-label={label}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="floatingSelect">{label}</label>
      </div>
    </>
  );
};

export default ComboBox;
