import { types } from "../../../src/auth/types/types"

describe('Pruebas en types.js', () => {
    test('debe de regresar estos types', () => {
        expect(types).toEqual({
            login: '[Auth] login',
            logout: '[Auth] logout',
        })
    })
})