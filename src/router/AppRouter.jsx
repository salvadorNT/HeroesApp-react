import { Navigate, Route, Routes } from "react-router";


import { Navbar } from "../ui";
import { MarvelPage, DcPage } from "../heroes";
import { LoginPage } from "../auth";


export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="marvel" element={<MarvelPage />} />
                <Route path="dc" element={<DcPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to={'marvel'} />} />
            </Routes>
        </>
    )
}
