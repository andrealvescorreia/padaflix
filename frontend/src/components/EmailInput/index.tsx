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
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [emailJaCadastrado, setEmailJaCadastrado] = useState(false)

  useEffect(() => {
    const isEmailValid = validator.isEmail(email);
    setIsValid(isEmailValid);
    onChange(email, isEmailValid);
  }, [email, onChange]);

  const handleEmailChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const isEmailValid = validator.isEmail(newEmail);
    setIsValid(isEmailValid);
  };

  const handleBlur = () => {
    setTouched(true);
  };
  const handleFocus = () => {
    setTouched(false)
  }

  const checkEmail = async () => {
    axiosInstance.get('')
      .then(() => {
        // "algumacoisa"
      })
      .catch(() => {
        alert("email já cadastrado!")
        setEmailJaCadastrado(true)
      })
  }
  useEffect(() => {
    if (touched && isValid && email !== '') {
      checkEmail();
    }
  }, [touched, isValid, email]);

  return (
    <TextField
      value={email}
      onChange={handleEmailChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      required
      error={touched && !isValid && email != ''}
      helperText={(touched && !isValid && email != '') ? 'Email inválido' : ''}
    />
  );
};


export default EmailInput;
