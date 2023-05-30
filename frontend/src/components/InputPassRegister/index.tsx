import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import validator from 'validator';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  value: string
}

export default function InputPassRegister({ onChange, value }: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const [errorMessage, setErrorMessage] = React.useState('')

  const validate = (value: string) => {
    if (value === '') {
      setErrorMessage(''); // Limpa a mensagem de erro quando o campo está vazio
    } else if (value.length < 8) {
      setErrorMessage('A senha deve ter no mínimo 6 caracteres');
    } else if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ) {
      setErrorMessage('Is Strong Password');
    } else if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
      })
    ) {
      setErrorMessage('Is Medium Password');
    } else {
      setErrorMessage('Is Weak Password');
    }
  };
  React.useEffect(() => {
    validate(value);
  }, [value]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          value={value}
          required
          endAdornment={
            <InputAdornment position="end" id="pass"	>

              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          />
          {value !== '' && <FormHelperText>{errorMessage}</FormHelperText>}
        
      </FormControl>

    </Box>
  );
}
