import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./ComponentsAccueilClient/AccueilGlobal.css.js";
import { FooterAccueil } from "./ComponentsAccueilClient/FooterAccueil.jsx";
import {
	pathways,
	IconCpu,
	IconShield,
	IconHeadset,
} from "./ComponentsAccueilClient/OptionsDemande.jsx";
import { loginUser } from "../Utilisateur/services/utilisateur.service.jsx";
import { AuthContext } from "../router/AuthContext.jsx";

function AccueilGlobal() {
	const navigate = useNavigate();
	const [data, setdata] = useState([]);
	const context = useContext(AuthContext);

	return (
		<>
			<style>{styles}</style>
			{/* HERO */}
			<section className="sl-hero">
				<div className="sl-hero-bg" />
				<div className="sl-hero-content">
					<p className="sl-hero-label">
						Portail Officiel d'Immigration
					</p>
					<h1 className="sl-hero-title">
						Votre Avenir,
						<br />
						Bien Documenté
					</h1>
					<p className="sl-hero-sub">
						Accédez à la résidence et à la citoyenneté à travers une
						infrastructure numérique souveraine, sécurisée et d'une
						précision absolue.
					</p>
					<div className="sl-hero-actions">
						<button
							className="btn-primary"
							onClick={() => {
								navigate("/login");
							}}
						>
							Commencer ma demande
						</button>
						<button className="btn-outline-white">
							Suivre mon dossier
						</button>
					</div>
				</div>
			</section>

			{/* PATHWAYS */}
			<section className="sl-section sl-pathways">
				<h2 className="sl-section-title">
					Choisissez votre voie vers la souveraineté
				</h2>
				<p className="sl-section-sub">
					Quatre parcours distincts pour établir votre futur. Chaque
					demande est traitée avec la rigueur et la dignité dues à
					votre projet de vie.
				</p>
				<div className="sl-cards-grid">
					{pathways.map((p, i) => (
						<div className="sl-card" key={i}>
							<div className="sl-card-icon">{p.icon}</div>
							<div className="sl-card-title">{p.title}</div>
							<div className="sl-card-desc">{p.desc}</div>
							<div className="sl-card-footer">
								<div className="sl-card-delay-label">
									Délai de traitement
								</div>
								<div className="sl-card-delay">{p.delay}</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* TRUST */}
			<section className="sl-section sl-trust">
				<div className="sl-trust-grid">
					<div className="sl-trust-left">
						<p className="sl-trust-tagline">
							Héritage d'Excellence
						</p>
						<p className="sl-trust-desc">
							Depuis plus d'un siècle, nous maintenons les plus
							hauts standards d'intégrité. Le Sovereign Ledger
							n'est pas seulement un portail, c'est le garant de
							votre statut juridique.
						</p>
					</div>

					<div className="sl-trust-right">
						<div className="sl-feature-block">
							<div className="sl-feature-header">
								<div className="sl-feature-icon">
									<IconCpu />
								</div>
								<div className="sl-feature-title">
									Processus de Décision Automatisé
								</div>
							</div>
							<p className="sl-feature-desc">
								Nos algorithmes de vérification assurent une
								équité totale. Chaque dossier est analysé sans
								biais, garantissant une réponse rapide basée
								uniquement sur le mérite de votre demande.
							</p>
						</div>

						<div className="sl-feature-row">
							<div className="sl-feature-block">
								<div className="sl-feature-header">
									<div className="sl-feature-icon">
										<IconShield />
									</div>
									<div className="sl-feature-title">
										Sécurité Souveraine
									</div>
								</div>
								<p className="sl-feature-desc">
									Cryptage de niveau défense pour la
									protection de vos données biométriques.
								</p>
							</div>
							<div className="sl-feature-block">
								<div className="sl-feature-header">
									<div className="sl-feature-icon">
										<IconHeadset />
									</div>
									<div className="sl-feature-title">
										Support Prioritaire
									</div>
								</div>
								<p className="sl-feature-desc">
									Accès 24/7 à des conseillers spécialisés en
									droit de l'immigration.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="sl-cta">
				<h2 className="sl-cta-title">
					Prêt à franchir le premier pas ?
				</h2>
				<p className="sl-cta-sub">
					L'enregistrement de votre profil prend moins de 10 minutes
					et constitue la clé de voûte de votre future demande.
				</p>
				<button
					className="btn-primary"
					onClick={() => {
						navigate("/client/register");
					}}
				>
					Commencer mon profil
				</button>{" "}
				{/*Envoie l'utilisateur vers une page d'inscription*/}
				<div className="sl-social-proof">
					<div className="sl-avatars">
						<div className="sl-mini-avatar">A</div>
						<div className="sl-mini-avatar">B</div>
						<div className="sl-mini-avatar">C</div>
					</div>
					<span className="sl-proof-text">
						+12 000 nouveaux résidents ce mois-ci
					</span>
				</div>
			</section>
			<FooterAccueil />
		</>
	);
}

export default AccueilGlobal;
