import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../../commun/commun.jsx";

export function AjouterClientModal({ onClose }) {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setPassword] = useState("");

    const modalRef = useRef(null);

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
                nom: nom,
                prenom: prenom,
                courriel: email,
                telephone: telephone,
                MDP: password
            };
            await apiFetch(`/auth/create/client`, {
                method: "POST",
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
            className={`modal is-active`}
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
                        Ajouter un client
                    </p>

                    <button
                        className="delete"
                        aria-label="Fermer la fenêtre"
                        onClick={onClose}
                    ></button>

                </header>

                {/* Body */}
                <section className="modal-card-body">
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
                                    placeholder="Entrez le nom du client"
                                    autoFocus
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    aria-label="Nom"
                                    required
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
                                    placeholder="Entrez le prénom du client"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    aria-label="Prénom"
                                    required
                                />
                            </div>

                        </div>

                        {/* Email */}
                        <div className="field">

                            <label className="label">
                                Courriel
                            </label>

                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Entrez l'email du client"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Email"
                                    required
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
                                    placeholder="Entrez le numéro de téléphone du client"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    aria-label="Téléphone"
                                    required
                                />
                            </div>

                        </div>

                        <div className="field">
                            <label className="label">
                                Mot de passe
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Entrez un mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-label="Mot de passe"
                                    required
                                />
                            </div>
                        </div>

                    </form>
                </section>

                {/* Footer */}
                <footer className="modal-card-foot is-justify-content-flex-end">

                    <button
                        type="button"
                        className="button is-danger"
                        onClick={onClose}
                        aria-label="Annuler"
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        className="button is-link"
                        aria-label="Sauvegarder"
                        onClick={handleSave}
                    >
                        Sauvegarder
                    </button>

                </footer>

            </div>

        </div>
    );
}