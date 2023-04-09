import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { useDispatch, useSelector } from "react-redux"

import { JournalLayout } from "../layout"
import { NoteView, NothingSelectedView } from "../views"

import { startNewNote } from "../../store/journal"




export const JournalPage = () => {

    const dispatch = useDispatch()
    const { isSaving, active } = useSelector( state => state.journal )

    const onClickNewNote = () => {
        dispatch( startNewNote() )
    }

    return (
        <JournalLayout>

            {   
                !active
                    ? <NothingSelectedView />
                    : <NoteView />
            }

        <IconButton
            onClick={onClickNewNote}
            disabled = {isSaving}
            size="large"
            sx={{ 
                color: 'white', 
                backgroundColor: 'error.main', 
                ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
                position: 'fixed',
                right: 50,
                bottom: 50
            }}
            
        >
            <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>


        </JournalLayout>
    )
}
