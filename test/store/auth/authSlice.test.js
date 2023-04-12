import { authSlice, authStatus, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures"




describe('Pruebas en authSlice', () => {
    
    test('Debe de regresar el estado inicial y llamarse "auth"', () => {

        
        const state = authSlice.reducer( initialState, {} )

        expect( state ).toEqual( initialState )
        expect( authSlice.name ).toBe('auth')
    })



    test('Debe de realizar la autenticación', () => {


        const state = authSlice.reducer( initialState, login( demoUser ) )

        expect( state ).toEqual({
            status: authStatus.authenticated,
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })
    })


    test('Debe de realizar el logout SIN argumentos', () => {

        const state = authSlice.reducer( authenticatedState, logout() )

        expect( state ).toEqual({
            status: authStatus.notAuthenticated,
            uid  : null,
            email: null,
            displayName: null,
            photoURL   : null,
            errorMessage: undefined,
        })
        
    })


    test('Debe de realizar el logout CON argumentos', () => {
    
        const errorMessage = 'Credenciales no son correctas'

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) )

        expect( state ).toEqual({
            status: authStatus.notAuthenticated,
            uid  : null,
            email: null,
            displayName: null,
            photoURL   : null,
            errorMessage: errorMessage,
        })

    })



    test('Debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer( initialState, checkingCredentials() )

        expect( state.status ).toBe( authStatus.checking )
    
    })
})