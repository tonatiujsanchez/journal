import { Routes, Route } from "react-router-dom"

import { AuthRoutes } from "../auth/routes"
import { JournalRoutes } from "../journal/routes"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={ <AuthRoutes /> }/>
            <Route path='/*' element={ <JournalRoutes /> }/>
        </Routes>
    )
}
