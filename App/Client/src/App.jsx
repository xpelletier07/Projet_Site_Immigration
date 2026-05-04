import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AccueilClient from "./AccueilClient.jsx"

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();


export function App() {
  const DonneUtils = []

  return (
    <>
      <AuthContext.Provider value={DonneUtils}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={< AccueilClient />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}


