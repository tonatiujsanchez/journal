import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'

import { AuthLayout } from '../layout/AuthLayout'
import { checkingAuthentication, startGoogleSignIn, authStatus } from '../../store/auth'



export const LoginPage = () => {

    const { status } = useSelector( state => state.auth )
    
    const { email, password, onInputChange } = useForm({
        email: 'correo@correo.com',
        password: '123456'
    })

    const isAuthenticating = useMemo( ()=> status === authStatus.checking )

    const dispatch = useDispatch()

    const onSubmit = ( ev ) => {
        ev.preventDefault()

        console.log({ email, password });
        dispatch( checkingAuthentication( email, password ) )
    }
    
    
    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() )
    }


    return (
        <AuthLayout title="Login">
            <form onSubmit={ onSubmit }>
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
