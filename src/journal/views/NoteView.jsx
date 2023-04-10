import { useEffect, useMemo, useRef } from "react"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks"

import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"


export const NoteView = () => {

    const dispatch = useDispatch()
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal )

    const { title, body, date, onInputChange, formState } = useForm( note )

    const dateString = useMemo(()=>{
        const newDate = new Date( date )
        return newDate.toUTCString()
    },[])

    const fileInputRef = useRef()


    useEffect(()=>{
        dispatch( setActiveNote( formState ) )
    },[formState])

    useEffect(()=>{
        if( messageSaved.length > 0 ){
            Swal.fire({
                title: 'Nota actualizada',
                text: messageSaved,
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    },[messageSaved])


    const onFileInputChange = ({ target }) => {
        if(target.files.length === 0) { return }

        dispatch( startUploadingFiles( target.files ) )
    }

    const onDeleteNote = () => {
        dispatch( startDeletingNote() )
    }

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    return (
        <Grid container 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={38} fontWeight="light">
                    { dateString }
                </Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
                <IconButton 
                    color="primary" 
                    disabled={isSaving}
                    onClick={ ()=> fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>
                <Button 
                    onClick={ onSaveNote } 
                    disabled={ isSaving }    
                    color="primary" 
                    sx={{ paddingX: 2, paddingY: 1 }}
                >
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
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que hay de nuevo hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>
            <Grid container justifyContent="end">
                <Button
                    onClick={ onDeleteNote }
                    sx={{ mt: 1, mb: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            <ImageGallery images={ note.imageUrls } />
        </Grid>
    )
}
