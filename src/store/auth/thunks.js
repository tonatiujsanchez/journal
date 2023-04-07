import { singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"



export const checkingAuthentication = ( email, password ) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() )

        
    }
} 

export const startGoogleSignIn = () => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await singInWithGoogle()

        if( !result.ok ){ 
            dispatch( logout( result.errorMessage ) ) 
            return
        }
        
        dispatch( login( result ) )
    }
} 