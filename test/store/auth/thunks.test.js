import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, singInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, starLoginWithEmailAndPassword, startGoogleSignIn, startLogout, startUserWithEmailAndPassword } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../fixtures/authFixtures"



jest.mock('../../../src/firebase/providers')


describe('Pruebas en thunks de Auth', () => {
    
    const dispatch = jest.fn()

    beforeEach( ()=> jest.clearAllMocks() )



    test('Debe de invocar el checkingCredentials mediante el checkingAuthentication', async() => {

        const fn = await checkingAuthentication()
        fn( dispatch )

        expect( dispatch ).toBeCalledWith( checkingCredentials() )

    })



    test('startGoogleSignIn debe de llamar checkingCredentials y login si sale todo bien', async() => {
    
        const loginData = { ok: true, ...demoUser }
        await singInWithGoogle.mockResolvedValue( loginData )


        // thunk
        await startGoogleSignIn()( dispatch )
     
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )

    })



    test('startGoogleSignIn debe de llamar starLoginWithEmailAndPassword y logout con mensaje de error', async() => {
    
        const errorMessage = 'Hubo un error en google'

        const loginData = { ok: false, errorMessage }
        await singInWithGoogle.mockResolvedValue( loginData )


        // thunk
        await startGoogleSignIn()( dispatch )
     
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage } ) )

    })



    test('starLoginWithEmailAndPassword debe de llamar starLoginWithEmailAndPassword y login si sale todo bien', async() => {

        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: demoUser.password }
        
        await loginWithEmailAndPassword.mockResolvedValue( loginData )

        // thunk
        await starLoginWithEmailAndPassword(formData)(dispatch)


        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
        
    })



    test('starLoginWithEmailAndPassword debe de llamar starLoginWithEmailAndPassword y logout con mensaje de error', async() => {

        const errorMessage = 'Hubo un error en google'
        const loginData = { ok: false, errorMessage }
        const formData = { email: demoUser.email, password: demoUser.password }

        
        await loginWithEmailAndPassword.mockResolvedValue( loginData )


        // thunk
        await starLoginWithEmailAndPassword(formData)(dispatch)

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage }) )
    })



    test('startUserWithEmailAndPassword debe de llamar registerUserWithEmailAndPassword y login si todo sale bien', async() => {

        const registerData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: demoUser.password, displayName: demoUser.displayName }

        await registerUserWithEmailAndPassword.mockResolvedValue(registerData)

        // thunk
        await startUserWithEmailAndPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( registerData ) )
        
    })



    test('startUserWithEmailAndPassword debe de llamar registerUserWithEmailAndPassword y logout con mensage de error', async() => {
        
        const errorMessage = 'Hubo un error en el registro'
        const registerData = { ok: false, errorMessage }
        const formData = { email: demoUser.email, password: demoUser.password, displayName: demoUser.displayName }

        await registerUserWithEmailAndPassword.mockResolvedValue(registerData)

        // thunk
        await startUserWithEmailAndPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage }) )
        
    })



    test('startLogout debe de llamar logoutFirebase, clearNotesLogout y logout', async() => {

        await startLogout()(dispatch)
        

        expect( logoutFirebase ).toHaveBeenCalled()
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() )
        expect( dispatch ).toHaveBeenCalledWith( logout() )
    })


})