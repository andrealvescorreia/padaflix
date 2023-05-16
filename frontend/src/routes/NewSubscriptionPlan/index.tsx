import * as React from 'react';
import { useState, SyntheticEvent } from "react";
import { Button, Container, TextField } from "@mui/material";
import "./styles.scss";
import FormControl from '@mui/material/FormControl';

const NewSubscriptionPlan = () => {
    const [planName, setPlanName] = useState('');
    const [planDescription, setPlanDescription] = useState('');
    const [planValue, setPlanValue] = useState(0);

    
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
    }

    return (
        <Container id="new-subscription-plan" maxWidth="sm" >
            <FormControl variant="standard"  onSubmit={handleSubmit} 
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                }}
                component="form"
                noValidate
                
                autoComplete="off"
            >

                <TextField 
                    label="Nome" 
                    value={planName}
                    onChange={e => setPlanName(e.target.value)} 
                    autoComplete='off'
                    margin="dense"
                />
                <TextField 
                    label="Descricao" 
                    value={planDescription}
                    onChange={e => setPlanDescription(e.target.value)} 
                    autoComplete='off'
                    multiline
                    margin="dense"
                />
                <TextField 
                    label="Preço" 
                    value={planValue}
                    type="number"
                    onChange={e => setPlanValue(parseInt(e.target.value))} 
                    autoComplete='off'
                    margin="dense"
                />

                <Button 
                    variant="contained" 
                    type="submit"
                    className='submit bttn'
                >Criar
                </Button>
            </FormControl>

        </Container>
  );
}
 
export default NewSubscriptionPlan;