import { MemoryRouter } from "react-router";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";
import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

const mockedUseNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedUseNavigate
}))
describe('Pruebas en <Navbar/>', () => {

    const user = {
        id: 1234,
        name: 'Salvador'
    }
    const contextValue = {
        logged: true,
        user: user,
        logout: jest.fn()
    }

    test('debe de mostrar el nombre del usuario autenticado', () => {


        render(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );


        expect(screen.getByText(user.name)).toBeTruthy();

    });

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {



        render(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Logout' }))
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { "replace": true });

    });
});