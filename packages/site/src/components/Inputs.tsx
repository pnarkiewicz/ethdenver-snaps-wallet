import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputStyles = {
  marginBottom: '30px',
};

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      style={inputStyles}
    />
  );
};