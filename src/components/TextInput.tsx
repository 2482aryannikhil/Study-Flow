type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function TextInput({ value, placeholder, onChange }: Props) {
  return (
    <input
      className="text-input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextInput;
