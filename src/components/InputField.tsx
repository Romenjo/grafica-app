const InputField = ({ label, placeholder, onChange }) => {
  return (
    <div className="form-floating">
      <input
        type="text"
        className="form-control"
        id="floatingInputGrid"
        placeholder={placeholder}
        onChange={onChange}
      />
      <label htmlFor="floatingInputGrid">{label}</label>
    </div>
  );
};

export default InputField;
