import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bulma/css/bulma.min.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContext } from "./AuthContext.jsx";
import AccueilGlobal from "../Accueil/AccueilGlobal.jsx"
//import {DashBordUtilisateur} from "../Utilisateur/pages/DashBordUtilisateur.jsx";
import {GestionsClients} from "../Utilisateur/pages/GestionsClients.jsx";
import {DetailsDossier} from "../Utilisateur/pages/DetailsDossier.jsx"
import { DashbordRouter } from "./DashbordRouter.jsx";


export function RouterUser() {
    const [token, settoken] = useState("");
    const DonneUtils = {token, settoken}

  return (
    <>
      <AuthContext.Provider value={DonneUtils}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={< AccueilGlobal />} />
            <Route path="/dashborduser" element={<DashbordRouter/>} />
            <Route path="/gestionclient" element={<GestionsClients/>} />
            <Route path="/details/:id" element={<DetailsDossier />}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}