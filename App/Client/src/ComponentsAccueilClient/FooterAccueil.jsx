export function FooterAccueil() {
    return (
        <>
            {/* Footer de la page d'accueil du site pour un client non connecté */}
            <footer className="sl-footer">
                <div className="sl-footer-grid">
                    <div>
                        <div className="sl-footer-brand">Sovereign Ledger</div>
                        <p className="sl-footer-brand-desc">
                            L'infrastructure de confiance pour l'immigration mondiale. Développé et maintenu par les Services Nationaux de la Citoyenneté.
                        </p>
                    </div>
                    {[
                        { title: "Plateforme", links: ["Politique de Confidentialité", "Conditions d'Utilisation", "Mentions Légales"] },
                        { title: "Accessibilité", links: ["Déclaration d'Accessibilité", "Aide au Contraste", "Lecteurs d'Écran"] },
                        { title: "Assistance", links: ["Centre d'Aide", "Contact Support", "Prendre Rendez-vous"] },
                    ].map(col => (
                        <div key={col.title}>
                            <div className="sl-footer-col-title">{col.title}</div>
                            <ul className="sl-footer-links">
                                {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="sl-footer-bottom">
                    <span className="sl-footer-copy">© 2024 Sovereign Ledger. Tous droits réservés. Un service du Gouvernement National.</span>
                    <div className="sl-footer-icons">
                        {["⊕", "♡", "✲"].map((ic, i) => (
                            <div className="sl-footer-icon-btn" key={i}>{ic}</div>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    )
}