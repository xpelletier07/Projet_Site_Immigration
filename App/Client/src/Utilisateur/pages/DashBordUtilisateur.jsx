import { useState } from "react";
import { globalStyles } from "../components/DashBord.css";
import { StatCards } from "../components/StatCards.jsx"
import { Sidebar } from "../components/SideBar.jsx"
import { DossierTable } from "../components/DossierTable.jsx"
import { RecentActivity } from "../components/RecentActivity.jsx"

export function DashBordUtilisateur() {
    const [active, setActive] = useState("Dashboard");

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
            <div style={{ display: "flex" }}>
                <Sidebar active={active} setActive={setActive} />
                <div className="main-content">
                    <div className="page-body">
                        <div className="page-title">DashBord Employé</div>
                        <div className="page-sub">
                            Bonjour, Monsieur. Vous avez du nouveau aujourd'hui!
                        </div>

                        <StatCards />

                        <div className="columns">
                            <div className="column is-7">
                                <DossierTable />
                            </div>
                            <div className="column is-5">
                                <RecentActivity />
                                <div className="legal-card">
                                    <div className="legal-watermark">⚖</div>
                                    <h3>Mise à jour juridique</h3>
                                    <p>
                                        Les nouvelles réglementations sur les visas pour 2024 sont maintenant en vigueur.
                                        Veuillez consulter le guide mis à jour afin d'assurer votre conformité.
                                    </p>
                                    <button className="read-btn">Lire le guide</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}