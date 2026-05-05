import React from "react";
import { FolderOpen, PlusCircle } from "lucide-react";
import { API_URL } from "../../commun/commun";

export default function DashboardClientEmpty() {
	async function createDemande() {
        Api_fetch(`${API_URL}/demandes/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_client: sessionStorage.getItem("userId"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert("Ouverture assistant nouvelle demande");
            })
            .catch((err) => console.error(err));
	}

	return (
		<div className="min-h-screen bg-slate-100 flex items-center justify-center p-10">
			<div className="bg-white rounded-3xl shadow-sm p-16 text-center max-w-4xl">
				<FolderOpen size={70} className="mx-auto text-blue-950 mb-6" />
				<h1 className="text-4xl font-bold mb-4">
					Bienvenue dans votre espace client
				</h1>
				<p className="text-slate-600 text-lg mb-10">
					Aucune demande active n'est enregistrée pour le moment.
				</p>
				<button
					onClick={createDemande}
					className="bg-blue-950 text-white px-8 py-4 rounded-2xl inline-flex gap-3"
				>
					<PlusCircle /> Commencer une nouvelle demande
				</button>
			</div>
		</div>
	);
}
