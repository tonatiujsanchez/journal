import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: '123S',
        //     title: '',
        //     body: '',
        //     date: 1212356,
        //     imageUrls: []
        // }
    },
    reducers: {

        savingNewNote: ( state ) => {
            state.isSaving = true
        },

        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload )
            state.isSaving = false
        },

        setActiveNote: ( state, action ) => {
            state.active = action.payload
            state.messageSaved =''
        },

        setNotes: ( state, action ) => {
            state.notes = action.payload
        },

        setSaving: ( state ) => {
            state.isSaving = true
            state.messageSaved =''
            //TODO: 
        },

        updateNote: ( state, action ) => {
            state.notes = state.notes.map( note => note.id === action.payload.id ? action.payload : note )
            state.isSaving = false
            // Mostrar mensaje de actualización
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`
        },

        deleteNoteById: ( state, action ) => {
            
        },
    }
});



export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
} = journalSlice.actions;