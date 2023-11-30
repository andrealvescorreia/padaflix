import "./styles.scss"
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'

interface ModalAskingForLoginProps {
    open: boolean,
    onClose: () => void,
    onClickLogin: () => void,
    onClickCreateAccount: () => void,
}

const askingForLoginModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '28rem',
    bgcolor: '#FFF8E4',
    borderRadius: "20px",
    p: 4,
    outline: 0,
    padding: 0
};

const ModalAskingForLogin = ({open, onClose, onClickLogin, onClickCreateAccount}: ModalAskingForLoginProps) => {

    const [modalIsOpen, setModalIsOpen] = useState(open);
    
    useEffect(() => {
        setModalIsOpen(open)
    }, [open])

    return (
        <Modal
            open={modalIsOpen}
            onClose={onClose}
        >
            <Box sx={askingForLoginModalStyle}>
                <div id="askingForLoginModalContainer">
                    <div className="header">
                        <button onClick={onClose}>
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="message">
                        Entre no Padaflix para assinar planos
                    </div>

                    <div className="actions">

                        <button className='loginBtn' onClick={onClickLogin} autoFocus >
                            Log in
                        </button>

                        ou

                        <button className='createNewAccountBtn' onClick={onClickCreateAccount} autoFocus >
                            Criar nova conta
                        </button>
                    </div>

                </div>
            </Box>
        </Modal>
    )
}
export default ModalAskingForLogin