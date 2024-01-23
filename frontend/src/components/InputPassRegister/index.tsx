import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import validator from 'validator';
import { useEffect, useState } from 'react';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  value: string
}

export default function InputPassRegister({ onChange, value }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(()=>{
    if(error || value.length >= 8)
      validate(value);
  },[value])

  const minPasswordRequirements = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
  }

  const validate = (value: string) => {
    setError(false);
    if (value === '') {
      setHelperText('No mínimo 8 caracteres, e conter ao menos uma letra maiúscula e um número');
    }
    else if (validator.isStrongPassword(value, { ...minPasswordRequirements, minSymbols: 1 })) {
      setHelperText('Senha forte');
    }
    else if (validator.isStrongPassword(value, minPasswordRequirements)) {
      setHelperText('Senha média');
    }
    else if (value.length < 8) {
      setError(true);
      setHelperText('A senha deve ter no mínimo 8 caracteres');
    }
    else {
      setError(true);
      setHelperText('A senha deve conter ao menos uma letra minúscula, uma maiúscula e um número');
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          required
          value={value}
          onChange={onChange}
          onFocus={() => validate(value)}
          onBlur={() => validate(value)}
          error={error}
          endAdornment={
            <InputAdornment position="end" id="pass"	>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}
