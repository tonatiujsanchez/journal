import { useMemo, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { startUserWithEmailAndPassword, authStatus } from '../../store/auth'


const formData = {
    email: '',
    password: '',
    displayName: '',
}

const formValidations = {
    email: [(value)=> value.includes('@'), 'El correro no es válido'],
    password: [(value)=> value.length >= 6, 'La contraseña es muy corta'],
    displayName: [(value)=> value.length >= 1, 'El nombre es requerido'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch()
    const [formSubmitted, setFormSubmitted] = useState(false)

    const { status, errorMessage } = useSelector( state => state.auth )

    const isAuthenticating = useMemo( ()=> status === authStatus.checking, [ status ] )

    const { 
        formState, displayName, email, password, onInputChange, 
        isFormValid, displayNameValid, emailValid, passwordValid  
    } = useForm(formData, formValidations)


    const onSubmit = (ev) => {
        ev.preventDefault()

        setFormSubmitted(true)

        if(!isFormValid){
            return
        }

        dispatch( startUserWithEmailAndPassword( formState ) )

    }

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            type="text"
                            placeholder="John Doe"
                            fullWidth
                            name="displayName"
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                        {
                            !!errorMessage &&
                            <Grid item xs={12}>
                                <Alert severity="error">
                                    { errorMessage }
                                </Alert>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Button disabled={ isAuthenticating } type="submit" variant="contained" fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end">
                    <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                    <Link component={RouterLink} color="inherit" to="/auth/login">
                        Ingresar
                    </Link>
                </Grid>


            </form>

        </AuthLayout>
    )
}
