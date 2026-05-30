export function Footer() {
    return (
        <>
            <footer className="sl-footer">
                <div className="columns" style={{ maxWidth: 1400, margin: "0 auto", padding: "3rem 2rem" }}>
                    <div className="column">
                        <p className="sl-footer-brand">ImmiPortail</p>
                        <p className="sl-footer-copy" style={{ marginTop: "1rem" }}>
                            © 2026 ImmiPortail. Tous droits réservés. Un service du Gouvernement National.
                        </p>
                    </div>
                    <div className="column is-narrow" style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2rem", alignItems: "flex-start", justifyContent: "flex-end" }}>
                        {["Privacy Policy", "Terms of Service", "Legal Notice", "Accessibility", "Contact Support"].map((link) => (
                            <a key={link} href="#" className="sl-footer-link">{link}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    )
}