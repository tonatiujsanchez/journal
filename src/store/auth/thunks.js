import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"



export const checkingAuthentication = () => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() )

    }
} 

export const startGoogleSignIn = () => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await singInWithGoogle()

        if( !result.ok ){ 
            dispatch( logout({ errorMessage: result.errorMessage }) ) 
            return
        }
        
        dispatch( login( result ) )
    }
}

export const startUserWithEmailAndPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )
        const result = await registerUserWithEmailAndPassword({ email, password, displayName })

        if( !result.ok ){ 
            dispatch( logout({ errorMessage: result.errorMessage }) ) 
            return
        }

        dispatch( login( result ) )
    }
}


export const starLoginWithEmailAndPassword = ({ email, password }) => {{

    return async( dispatch ) => {

        dispatch( checkingCredentials() )
        const result = await loginWithEmailAndPassword({ email, password })

        if( !result.ok ){ 
            dispatch( logout({ errorMessage: result.errorMessage }) ) 
            return
        }

        dispatch( login( result ) )
    }
}}


export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase()
        dispatch( clearNotesLogout() )  
        dispatch( logout() )  
    }
}