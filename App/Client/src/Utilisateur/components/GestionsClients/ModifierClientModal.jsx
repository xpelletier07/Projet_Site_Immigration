import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../commun/commun.jsx";

export function ModifierClientModal({ idClient, onClose }) {

    const [clientData, setClientData] = useState(null);

    const modalRef = useRef(null);

    useEffect(() => {

        async function fetchClient() {

            try {

                // TODO :
                // Remplacer cette route par votre vraie route backend
                // permettant de récupérer les informations du client

                const data = await apiFetch(`/clients/${idClient}`);

                setClientData(data);

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
                style={{ outline: "none" }}
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

                            <form>

                                {/* Nom */}
                                <div className="field">

                                    <label className="label">
                                        Nom
                                    </label>

                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            defaultValue={clientData.nom}
                                            autoFocus
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
                                            defaultValue={clientData.prenom}
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
                                            defaultValue={clientData.email}
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
                                            defaultValue={clientData.telephone}
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
                        className="button"
                        onClick={onClose}
                    >
                        Annuler
                    </button>

                    <button
                        className="button is-link"
                    >
                        Sauvegarder
                    </button>

                </footer>

            </div>

        </div>
    );
}