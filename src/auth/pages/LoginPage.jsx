import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'

import { AuthLayout } from '../layout/AuthLayout'
import { startGoogleSignIn, authStatus, starLoginWithEmailAndPassword } from '../../store/auth'


const formData = {
    email: '',
    password: ''
}


export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch()
    
    const { email, password, onInputChange } = useForm( formData )

    const isAuthenticating = useMemo( ()=> status === authStatus.checking, [status] )


    const onSubmit = ( ev ) => {
        ev.preventDefault()
        dispatch( starLoginWithEmailAndPassword({ email, password }) )
    }
    
    
    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn({ email, password }) )
    }


    return (
        <AuthLayout title="Login">
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            name="email"
                            onChange={ onInputChange }
                            value={ email }
                            placeholder="ejemplo@correo.com"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            name="password"
                            onChange={ onInputChange }
                            value={ password }
                            placeholder="Contraseña"
                            fullWidth
                        />
                    </Grid>

                        {
                            !!errorMessage &&
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        { errorMessage }
                                    </Alert>
                                </Grid>
                            </Grid>
                        }

                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={ isAuthenticating } type="submit" variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={ isAuthenticating } onClick={ onGoogleSignIn } variant="contained" fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid container direction="row" justifyContent="end">
                    <Link component={RouterLink} color="inherit" to="/auth/register">
                        Crear una cuenta
                    </Link>
                </Grid>

            </form>

        </AuthLayout>
    )
}
