import React, { useState } from 'react';
import validator from 'validator';
import { TextField } from '@mui/material';

interface Props {
  onChange: (value: string, isValid: boolean) => void;
}

const EmailInput: React.FC<Props> = ({ onChange }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const isEmailValid = validator.isEmail(newEmail);
    setIsValid(isEmailValid);
    onChange(newEmail, isEmailValid);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <TextField
      value={email}
      onChange={handleEmailChange}
      onBlur={handleBlur}
      required
      error={touched && !isValid}
      helperText={touched && !isValid ? 'Email inválido' : ''}
    />
  );
};


export default EmailInput;
