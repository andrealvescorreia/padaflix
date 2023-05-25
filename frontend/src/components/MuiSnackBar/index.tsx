import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';


interface MuiSnackbarProps{
    open: boolean,
    setOpen: ( value : boolean ) => void,
    message: string,
    severity: AlertColor
}

const MuiSnackbar = (props: MuiSnackbarProps) => {
    const {open, setOpen, message, severity} = props
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default MuiSnackbar


/*

* COMO USAR ESSA SNACKBAR:

* Importe o "AlertColor" e a muisnackbar:

import { AlertColor } from '@mui/material/Alert';
import MuiSnackbar from '../../components/MuiSnackBar';

 * Copie e cole o seguinte código para dentro do seu componente:

const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('')
const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success")

function showSnackbar( severity: AlertColor, message: string){
    setOpenSnackbar(true)
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
}

 * Insira a Snackbar dentro do retorno do seu componente. Ex:

return (
    <div>
        ...
        
        <MuiSnackbar 
            open = {openSnackbar} 
            setOpen = {setOpenSnackbar} 
            message = {snackbarMessage} 
            severity = {snackbarSeverity}
        />

        ...
    </div>
)

* Agora, para usar a snackbar é so chamar a função showSnackbar() a qualquer momento. Ex:

showSnackbar("success", "Registrado com sucesso!")
showSnackbar("error", "Ocorreu um erro no registro")

*/