import { fireEvent, render, screen } from "@testing-library/react";
import { HeroPage } from "../../../src/heroes/pages/HeroPage";
import { MemoryRouter, Route, Routes } from "react-router";

const heroId = 'marvel-iron';
const mockedUseNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedUseNavigate,
    // useParams: () => ({ id: heroId })
}))

describe('Pruebas en <HeroPage/>', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de navegar a "marvel si no existe el heroe', () => {

        render(
            <MemoryRouter initialEntries={['/hero/marvel-iron2345']}>
                <Routes>
                    <Route path="marvel" element={<h1>Marvel Page</h1>} />
                    <Route path="hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Marvel Page')).toBeTruthy();

    });

    test('debe de ejecutarse onNavigateBack al presionar el boton Regresar', () => {
        render(
            <MemoryRouter initialEntries={[`/hero/${heroId}`]}>
                <Routes>
                    <Route path="hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        );

        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(mockedUseNavigate).toHaveBeenCalled();
    });

    test('debe de mostar la imagen del hero', () => {
        render(
            <MemoryRouter initialEntries={[`/hero/${heroId}`]}>
                <Routes>
                    <Route path="hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        );

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/marvel-iron.jpg');
    });

});