import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../../src/firebase/config"

import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice"
import { startNewNote } from "../../../src/store/journal/thunks"

describe('Pruebas en Journal thunks', () => {

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach( ()=> jest.clearAllMocks() )

    test('Dede de crear una nota en blanco', async() => {


        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid } })

        await startNewNote()( dispatch, getState )
        

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() )
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
        }) )
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
        }) )


        // Elimnar notas de Firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` )
        const docs = await getDocs(collectionRef)
        
        const deletePromises = []

        docs.forEach(doc => {
            deletePromises.push( deleteDoc( doc.ref ) )
        });

        await Promise.all( deletePromises )
        
    })
})