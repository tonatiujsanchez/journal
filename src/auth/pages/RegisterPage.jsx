import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"

import { useForm } from '../../hooks'

import { AuthLayout } from '../layout/AuthLayout'


const formData = {
    displayName: '',
    email: '',
    password: ''
}

export const RegisterPage = () => {

    const { displayName, email, password, onInputChange, formState } = useForm(formData)

    const onSubmit = (ev) => {
        ev.preventDefault()

        if([displayName.trim(), email.trim(), password.trim()].includes('')) { 
            
            return
        }


        console.log(formState);
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
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>
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
