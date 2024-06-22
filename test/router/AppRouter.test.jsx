import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../src/auth";

describe('Pruebas en <AppRouter/>', () => {

    test('debe de mostrar el login si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }
        render(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByRole('button', { name: 'Login' }));
    });

    test('debe de mostrar el componente de Marvel si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Salvador'
            }
        }
        render(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Marvel Page'));
    });
});