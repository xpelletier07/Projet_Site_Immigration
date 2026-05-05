export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

  :root {
    --navy: #0b1f3a;
    --navy-mid: #163260;
    --gold: #c8a96e;
    --cream: #f8f6f1;
    --light-gray: #f2f2f0;
    --text-dark: #111827;
    --text-muted: #6b7280;
    --border: #e2ddd5;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, html { font-family: 'IBM Plex Sans', sans-serif; background: white; }

  .sl-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: white;
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 58px;
  }

  .sl-logo {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: var(--navy);
    letter-spacing: 0.02em;
  }

  .sl-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .sl-nav-links a {
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .sl-nav-links a:hover { color: var(--navy); }
  .sl-nav-links a.active {
    color: var(--navy);
    font-weight: 500;
    border-bottom: 2px solid var(--navy);
    padding-bottom: 2px;
  }

  .sl-nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .sl-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--navy);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    font-weight: 600;
  }

  /* HERO */
  .sl-hero {
    position: relative;
    min-height: 480px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .sl-hero-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, rgba(11,31,58,0.82) 40%, rgba(11,31,58,0.3) 100%),
      url('https://images.unsplash.com/photo-1565118531796-763e5082d113?w=1400&q=80') center/cover no-repeat;
  }

  .sl-hero-content {
    position: relative;
    z-index: 2;
    padding: 5rem 4rem;
    max-width: 560px;
  }

  .sl-hero-label {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 1.2rem;
    font-weight: 400;
  }

  .sl-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    font-weight: 800;
    color: white;
    line-height: 1.1;
    margin-bottom: 1.2rem;
  }

  .sl-hero-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.75);
    line-height: 1.7;
    max-width: 380px;
    margin-bottom: 2.2rem;
    font-weight: 300;
  }

  .sl-hero-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: var(--navy);
    color: white;
    border: none;
    padding: 0.75rem 1.6rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--navy-mid); }

  .btn-outline-white {
    background: transparent;
    color: white;
    border: 1px solid rgba(255,255,255,0.5);
    padding: 0.75rem 1.6rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
  }
  .btn-outline-white:hover { border-color: white; background: rgba(255,255,255,0.08); }

  /* SECTION HEADINGS */
  .sl-section { padding: 5rem 4rem; }
  .sl-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 0.6rem;
  }
  .sl-section-sub {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.65;
    max-width: 420px;
    margin-bottom: 3rem;
    font-weight: 300;
  }

  /* PATHWAY CARDS */
  .sl-pathways {
    background: white;
  }

  .sl-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
  }

  .sl-card {
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 1.6rem 1.4rem 1.4rem;
    background: white;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .sl-card:hover {
    box-shadow: 0 4px 24px rgba(11,31,58,0.09);
    transform: translateY(-2px);
  }

  .sl-card-icon {
    width: 38px;
    height: 38px;
    background: var(--cream);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
  }

  .sl-card-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 0.3rem;
  }

  .sl-card-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.55;
    flex: 1;
    font-weight: 300;
  }

  .sl-card-footer {
    margin-top: 1.2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }

  .sl-card-delay-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 3px;
    font-weight: 400;
  }

  .sl-card-delay {
    font-size: 14px;
    font-weight: 600;
    color: var(--navy);
  }

  /* TRUST SECTION */
  .sl-trust {
    background: var(--light-gray);
  }

  .sl-trust-grid {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 2.5rem;
    align-items: start;
  }

  .sl-trust-left {
    background: var(--navy);
    border-radius: 3px;
    padding: 2.8rem 2.4rem;
    color: white;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
  }

  .sl-trust-left::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 40px solid rgba(255,255,255,0.04);
  }

  .sl-trust-tagline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
    font-weight: 700;
    color: white;
    line-height: 1.2;
    margin-bottom: 0.9rem;
  }

  .sl-trust-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.65);
    line-height: 1.65;
    font-weight: 300;
  }

  .sl-trust-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sl-feature-block {
    background: white;
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 1.3rem 1.4rem;
  }

  .sl-feature-header {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.5rem;
  }

  .sl-feature-icon {
    width: 32px;
    height: 32px;
    background: var(--cream);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sl-feature-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .sl-feature-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.55;
    font-weight: 300;
  }

  .sl-feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  /* CTA */
  .sl-cta {
    background: white;
    text-align: center;
    padding: 6rem 4rem;
  }

  .sl-cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 0.8rem;
  }

  .sl-cta-sub {
    font-size: 14px;
    color: var(--text-muted);
    max-width: 360px;
    margin: 0 auto 2rem;
    line-height: 1.65;
    font-weight: 300;
  }

  .sl-social-proof {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1.8rem;
  }

  .sl-avatars {
    display: flex;
  }

  .sl-mini-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -8px;
    background: var(--navy);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: white;
    font-weight: 500;
  }

  .sl-mini-avatar:first-child { margin-left: 0; }
  .sl-mini-avatar:nth-child(2) { background: #1a4a7a; }
  .sl-mini-avatar:nth-child(3) { background: #2d5986; }

  .sl-proof-text {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 300;
  }

  /* FOOTER */
  .sl-footer {
    background: white;
    border-top: 1px solid var(--border);
    padding: 3rem 4rem 2rem;
  }

  .sl-footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  .sl-footer-brand {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: var(--navy);
    margin-bottom: 0.6rem;
  }

  .sl-footer-brand-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.6;
    font-weight: 300;
    max-width: 200px;
  }

  .sl-footer-col-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-dark);
    margin-bottom: 1rem;
  }

  .sl-footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sl-footer-links a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 300;
    transition: color 0.2s;
  }
  .sl-footer-links a:hover { color: var(--navy); }

  .sl-footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sl-footer-copy {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 300;
  }

  .sl-footer-icons {
    display: flex;
    gap: 0.8rem;
  }

  .sl-footer-icon-btn {
    width: 28px;
    height: 28px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 12px;
    transition: all 0.2s;
  }
  .sl-footer-icon-btn:hover { border-color: var(--navy); color: var(--navy); }

  @media (max-width: 768px) {
    .sl-section { padding: 3rem 1.5rem; }
    .sl-hero-content { padding: 3.5rem 1.5rem; }
    .sl-trust-grid { grid-template-columns: 1fr; }
    .sl-footer-grid { grid-template-columns: 1fr 1fr; }
    .sl-feature-row { grid-template-columns: 1fr; }
    .sl-cta { padding: 4rem 1.5rem; }
  }
`;