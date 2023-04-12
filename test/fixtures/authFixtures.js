import { authStatus } from "../../src/store/auth/authSlice"


export const initialState = {
    status: authStatus.checking,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}


export const authenticatedState = {
    status: authStatus.authenticated,
    uid: '123ABC',
    email: 'user@email.com',
    displayName: 'John Doe',
    photoURL: 'https://john.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: authStatus.notAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
    uid: '123ABC',
    email: 'user@email.com',
    displayName: 'John Doe',
    photoURL: 'https://john.jpg',
}