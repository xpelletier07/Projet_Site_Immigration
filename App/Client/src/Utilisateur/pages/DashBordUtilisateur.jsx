import { useState, useEffect } from "react";
import { globalStyles } from "../components/DashbordUtilisateur/DashBord.css.js";
import { StatCards } from "../components/StatCards.jsx"
import { Sidebar } from "../components/SideBar.jsx"
import { DossierTable } from "../components/DashbordUtilisateur/DossierTable.jsx"
import { RecentActivity } from "../components/DashbordUtilisateur/RecentActivity.jsx"
import { apiFetch } from "../../commun/commun";


export default function DashBordUtilisateur() {
    const [active, setActive] = useState("Dashboard");
    const [dossiers, setdossiers] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        async function FetchData() {
            try {
                const listdossier = await apiFetch("/dossiers")

                const contenu = await Promise.all(
                    listdossier.map(async (e) => {
                        try {
                            const detailsfordossier = await apiFetch(`/dossiers/${e.id_dossier}`)

                            return { dossier: e, details: detailsfordossier }
                        } catch (err) {
                            console.error(`Erreur lors de la récupération des détails pour le dossier ${e.id_dossier}`, err);
                        }
                    })
                )

                const recentActivities = contenu.slice(-5).map((dossier) => ({
                    title: `Dossier #${dossier.dossier.id_dossier} mis à jour`,
                    desc: `Le dossier de ${dossier.dossier.nom} a été mis à jour récemment.`,
                    time: new Date(dossier.dossier.created_at).toLocaleString(),
                    icon: "fa-file-alt",
                    cls: "is-primary",
                }));

                setActivities(recentActivities);

                setdossiers(contenu);

                console.log("details dossiers :", contenu)
            }
            catch (err) {
                console.error("Erreur lors de la récupération des dossiers:", err);
            }
        }

        FetchData();
    }, [])

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
                                <DossierTable dossiers={dossiers} />
                            </div>
                            <div className="column is-5">
                                <RecentActivity activities={activities} />
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