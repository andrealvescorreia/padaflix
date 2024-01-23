import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { TextField } from '@mui/material';
import axiosInstance from '../../axios';

interface EmailInputProps {
  onChange: (value: string, isValid: boolean) => void,
  value: string
}

const EmailInput = (props: EmailInputProps) => {
  const { onChange, value } = props
  const [email, setEmail] = useState(value);
  const [error, setError] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    onChange(email, emailIsValid);
  }, [email, emailIsValid])

  const validateEmail = async (newEmail: string) => {
    setError(false);
    setHelperText('');
    const isEmailValid = validator.isEmail(newEmail);
    const isEmailInUse = await isEmailAlreadyInUse(newEmail);
    if (newEmail !== '') {
      if (!isEmailValid) {
        setError(true);
        setHelperText('E-mail inválido');
      }
      if (isEmailInUse) {
        setError(true);
        setHelperText('E-mail já está em uso');
      }
    }
    return (isEmailValid && !isEmailInUse);
  };

  async function isEmailAlreadyInUse(email: string) {
    try {
      const response = await axiosInstance.get(`/register_user?email=${email}`);
      if (response.status === 204) return false;
      else return true;
    } catch (e) {
      return true;
    }
    // isso ficou estranho, mas é culpa do backend que retorna um erro caso o email exista!
  };

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailIsValid(await validateEmail(newEmail));
  };

  return (
    <TextField
      value={email}
      onBlur={handleBlur}
      required
      onChange={e => setEmail(e.target.value)}
      error={error}
      helperText={helperText}
    />
  );
};


export default EmailInput;
