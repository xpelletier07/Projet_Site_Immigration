import { useState } from "react";
import { globalStyles } from "../components/DashBord.css";
import { StatCards } from "../components/StatCards.jsx"
import { Sidebar } from "../components/SideBar.jsx"
import { DossierTable } from "../components/DossierTable.jsx"
import { RecentActivity } from "../components/RecentActivity.jsx"

export default function DashBordUtilisateur() {
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
                                    <h3>Legal Update</h3>
                                    <p>New visa regulations for 2024 are now effective. Please review the updated handbook for compliance.</p>
                                    <button className="read-btn">Read Handbook</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}