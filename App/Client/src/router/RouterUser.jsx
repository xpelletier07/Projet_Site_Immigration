import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "bulma/css/bulma.min.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import AccueilGlobal from "../Accueil/AccueilGlobal.jsx"
import {DashboardUtilisateur} from "../Utilisateur/pages/DashBordUtilisateur.jsx";
import {GestionsClients} from "../Utilisateur/pages/GestionsClients.jsx";
import {DetailsDossier} from "../Utilisateur/pages/DetailsDossier.jsx"

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();


export function RouterUser() {
    const [token, settoken] = useState("");
  const DonneUtils = [token, settoken]

  return (
    <>
      <AuthContext.Provider value={DonneUtils}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={< AccueilClient />} />
            <Route path="/dashborduser" element={<DashBordUtilisateur/>} />
            <Route path="/gestionclient" element={<GestionsClients/>} />
            <Route path="/details/:id" element={<DetailsDossier.jsx />}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}