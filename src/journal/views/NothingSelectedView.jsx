import { Grid, Typography } from "@mui/material"
import { StarOutline } from "@mui/icons-material"



export const NothingSelectedView = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 115px)', backgroundColor: 'primary.main', borderRadius: 2 }}
        >
            <Grid item xs={12}>
                <StarOutline sx={{ fontSize: 80, color: 'white' }} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ color: 'white' }} >
                    Selecciona o crea una nueva nota
                </Typography>
            </Grid>
        </Grid>
    )
}
