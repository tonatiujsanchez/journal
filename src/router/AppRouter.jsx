import { Routes, Route, Navigate } from "react-router-dom"

import { authStatus } from "../store/auth"

import { JournalRoutes } from "../journal/routes"
import { AuthRoutes } from "../auth/routes"

import { CheckingAuth } from "../ui"
import { useCheckAuth } from "../hooks"

export const AppRouter = () => {

    const { status } = useCheckAuth()

    if( status ===  authStatus.checking ){
        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                (status === authStatus.authenticated)
                ? <Route path='/*' element={ <JournalRoutes /> }/>
                : <Route path='/auth/*' element={ <AuthRoutes /> }/>
            }
            <Route path="/*" element={ <Navigate to="/auth/login"/> } />
        </Routes>
    )
}
