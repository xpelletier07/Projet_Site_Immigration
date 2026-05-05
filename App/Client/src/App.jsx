import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AccueilGlobal from "./Accueil/AccueilGlobal.jsx"


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


