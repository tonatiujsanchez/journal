import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

import { authStatus } from "../store/auth"

import { JournalRoutes } from "../journal/routes"
import { AuthRoutes } from "../auth/routes"

import { CheckingAuth } from "../ui"

export const AppRouter = () => {


    const { status } = useSelector( state => state.auth )

    if( status ===  authStatus.checking ){
        return <CheckingAuth />
    }

    return (
        <Routes>
            <Route path='/auth/*' element={ <AuthRoutes /> }/>
            <Route path='/*' element={ <JournalRoutes /> }/>
        </Routes>
    )
}
