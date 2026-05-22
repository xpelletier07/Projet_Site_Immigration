import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bulma/css/bulma.min.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContext } from "./AuthContext.jsx";
import DashBordUtilisateur from "../Utilisateur/pages/DashBordUtilisateur.jsx";


export function DashbordRouter() {
  const [token, settoken] = useState("");
  const DonneUtils = { token, settoken }

  return (
    <>
      <Routes>
        <Route path="/" element={<DashBordUtilisateur />} />
      </Routes>
    </>
  )
}