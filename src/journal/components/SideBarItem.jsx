import { useMemo } from "react"

import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { useDispatch } from "react-redux"

import { setActiveNote } from "../../store/journal"



export const SideBarItem = ({ note }) => {


    const dispatch = useDispatch()

    const newTitle = useMemo(()=> {
        return note.title.length > 17 
            ? note.title.substring(0,17) + '...'
            : note.title
    },[note.title])

    
    const onClickSetActiveNote = () => {
        dispatch( setActiveNote( note ) )
    }

    return (
        <ListItem onClick={ onClickSetActiveNote } disablePadding>
            <ListItemButton direction="row" alignItems="flex-start">
                <ListItemIcon >
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText sx={{ width: '100%' }} primary={ newTitle } />
                    <ListItemText secondary={ note.body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
