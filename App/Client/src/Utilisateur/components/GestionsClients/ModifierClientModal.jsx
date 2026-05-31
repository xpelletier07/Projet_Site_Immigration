import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../../commun/commun.jsx";

export function ModifierClientModal({ idClient, onClose }) {

    const [clientData, setClientData] = useState(null);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setPassword] = useState("");

    const modalRef = useRef(null);

    useEffect(() => {

        async function fetchClient() {

            try {

                // TODO :
                // Remplacer cette route par votre vraie route backend
                // permettant de récupérer les informations du client

                const data = await apiFetch(`/clients/${idClient}`);

                setClientData(data);
                setNom(data.nom || "");
                setPrenom(data.prenom || "");
                setEmail(data.courriel || "");
                setTelephone(data.telephone || "");

            } catch (err) {
                console.error(err);
            }
        }

        if (idClient) {
            fetchClient();
        }

    }, [idClient]);

    // Focus automatique + touche Escape
    useEffect(() => {

        if (modalRef.current) {
            modalRef.current.focus();
        }

        function handleKeyDown(e) {

            if (e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [onClose]);

    async function handleSave() {
        try {
            const updatedData = {
                nom: nom || clientData.nom,
                prenom: prenom || clientData.prenom,
                courriel: email || clientData.courriel,
                telephone: telephone || clientData.telephone,
                MDP: password || undefined // Ne pas envoyer le champ si le mot de passe n'est pas modifié
            };
            await apiFetch(`/clients/update/${idClient}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            });
            onClose();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div
            className={`modal ${idClient ? "is-active" : ""}`}
            aria-modal="true"
            role="dialog"
        >

            {/* Background */}
            <div
                className="modal-background"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div
                className="modal-card"
                ref={modalRef}
                tabIndex={-1}
                style={{ outline: "none", zIndex: 10000, pointerEvents: 'auto' }}
            >

                {/* Header */}
                <header className="modal-card-head">

                    <p className="modal-card-title">
                        Modifier le client
                    </p>

                    <button
                        className="delete"
                        aria-label="Fermer la fenêtre"
                        onClick={onClose}
                    ></button>

                </header>

                {/* Body */}
                <section className="modal-card-body">

                    {
                        !clientData ? (

                            <div className="has-text-centered">
                                Chargement...
                            </div>

                        ) : (

                            <form onSubmit={(e) => e.preventDefault()}>

                                {/* Nom */}
                                <div className="field">

                                    <label className="label">
                                        Nom
                                    </label>

                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                        />
                                    </div>

                                </div>

                                {/* Prenom */}
                                <div className="field">

                                    <label className="label">
                                        Prénom
                                    </label>

                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value={prenom}
                                            onChange={(e) => setPrenom(e.target.value)}
                                        />
                                    </div>

                                </div>

                                {/* Email */}
                                <div className="field">

                                    <label className="label">
                                        Email
                                    </label>

                                    <div className="control">
                                        <input
                                            className="input"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                </div>

                                {/* Téléphone */}
                                <div className="field">

                                    <label className="label">
                                        Téléphone
                                    </label>

                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value={telephone}
                                            onChange={(e) => setTelephone(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className="field">
                                    <label className="label">
                                        Mot de passe (laisser vide pour ne pas changer)
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Entrez un nouveau mot de passe"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </form>

                        )
                    }

                </section>

                {/* Footer */}
                <footer className="modal-card-foot is-justify-content-flex-end">

                    <button
                        type="button"
                        className="button"
                        onClick={onClose}
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        className="button is-link"
                        onClick={handleSave}
                    >
                        Sauvegarder
                    </button>

                </footer>

            </div>

        </div>
    );
}