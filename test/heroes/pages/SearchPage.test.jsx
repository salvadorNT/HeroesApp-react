import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { MemoryRouter, useNavigate } from "react-router";

const mockedUseNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedUseNavigate
}));


describe('Pruebas en <SearchPage/>', () => {
    
    beforeEach(() => jest.clearAllMocks() );
    
    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const image = screen.getByRole('img');
        expect(image.src).toContain('/assets/heroes/dc-batman.jpg');
        // screen.debug();

        const heroAlert = screen.getByLabelText('hero-result');
        expect(heroAlert.style.display).toBe('none');

        const alertNotFound = screen.getByLabelText('alert-danger');
        expect(alertNotFound.style.display).toBe('none');
    });

    test('debe de mostrar un error si no se encuentra el hero (batma123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alertNotFound = screen.getByLabelText('alert-danger');
        expect(alertNotFound.style.display).toBe('');

    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'spiderman'
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: inputValue } })

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
        
    });

});