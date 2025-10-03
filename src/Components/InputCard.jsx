function InputField({ placeholder, title, width, onChange, value, ...props }) {
  return (
    <>
      <p className="text-xs">{title}</p>
      <input
        type="text"
        placeholder={placeholder}
        className={`bg-zinc-100 border-2 h-12 ${width} outline-none rounded-md text-md p-2 capitalize`}
        {...props}
        onChange={onChange}
        value={value}
      />
    </>
  );
}
export default InputField;
