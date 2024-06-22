import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {

    const initialState = {
        logged: false
    }

    test('debe de retornar el estado por defecto', () => {
        const state = authReducer(initialState, {});
        expect(state).toBe(initialState);
    });

    test('debe de llamar el login, autenticar y establecer el user', () => {
        const user = {
            id: 1234,
            name: 'Salvador',
        }

        const action = {
            type: types.login,
            payload: user
        }
        const newState = authReducer(initialState, action);

        expect(newState.user).toEqual(action.payload);
        expect(newState.logged).toBeTruthy();

    });

    test('debe de llamar el logout,  borrar el name del usuario y establecer logged en false', () => {
        const logged_state = {
            logged: true,
            user: { id: 1234, name: 'Salvador' }
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer(logged_state, action);

        expect(newState.logged).toBeFalsy();
        expect(newState).toEqual(initialState);
    });
});