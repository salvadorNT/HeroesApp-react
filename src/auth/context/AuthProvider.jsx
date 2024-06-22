import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"
import { types } from "../types/types"


const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user: user
    }


}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {}, init);

    const onLogin = (id = 123, name = '') => {
        const user = {
            id: id,
            name: name
        }

        const action = {
            type: types.login,
            payload: user
        }

        localStorage.setItem('user', JSON.stringify(user))

        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{ ...state, login: onLogin }}>
            {children}
        </AuthContext.Provider>
    )
}
