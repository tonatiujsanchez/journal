import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"


export const NoteView = () => {
    return (
        <Grid container 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={38} fontWeight="light">
                    28 de agosto del 2023
                </Typography>
            </Grid>
            <Grid item>
                <Button color="primary" sx={{ paddingX: 2, paddingY: 1 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container sx={{ mb: 2 }}>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Título de la nota"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que hay de nuevo hoy?"
                    minRows={ 5 }
                />
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGallery />
        </Grid>
    )
}
