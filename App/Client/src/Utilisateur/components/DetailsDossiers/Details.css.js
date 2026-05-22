export const style = `
  @import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css');

  :root {
    --primary:           #001e40;
    --primary-container: #003366;
    --primary-fixed:     #d5e3ff;
    --primary-fixed-dim: #a7c8ff;
    --secondary:         #515f74;
    --secondary-container: #d5e3fc;
    --on-secondary-container: #57657a;
    --tertiary-container:  #592300;
    --tertiary-fixed:      #ffdbca;
    --tertiary-fixed-dim:  #ffb690;
    --on-tertiary-fixed-variant: #723610;
    --on-primary-container: #799dd6;
    --surface:             #f7f9fb;
    --surface-low:         #f2f4f6;
    --surface-mid:         #eceef0;
    --surface-high:        #e6e8ea;
    --surface-highest:     #e0e3e5;
    --surface-white:       #ffffff;
    --on-surface:          #191c1e;
    --on-surface-var:      #43474f;
    --outline:             #737780;
    --outline-var:         #c3c6d1;
    --error:               #ba1a1a;
    --error-container:     #ffdad6;
    --on-error-container:  #93000a;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--surface);
    color: var(--on-surface);
    min-height: 100vh;
  }
  h1, h2, h3, .brand { font-family: 'Public Sans', sans-serif; }

  /* ── Breadcrumb ── */
  .sl-breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--secondary);
    margin-bottom: 0.4rem;
  }
  .sl-breadcrumb .sep { font-size: 0.75rem; color: var(--outline); }

  /* ── Page title ── */
  .page-title {
    font-size: 1.9rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--primary);
    font-family: 'Public Sans', sans-serif;
  }

  /* ── Header action buttons ── */
  .btn-export {
    background: var(--surface-high);
    color: var(--on-surface);
    border: none;
    border-radius: 8px;
    padding: 0.55rem 1.1rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
    font-family: 'Inter', sans-serif;
  }
  .btn-export:hover { background: var(--surface-highest); }

  .btn-update-status {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.55rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    transition: transform 0.15s;
    font-family: 'Inter', sans-serif;
  }
  .btn-update-status:active { transform: scale(0.96); }

  /* ── Cards ── */
  .sl-card {
    background: var(--surface-white);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    margin-bottom: 1.5rem;
  }
  .sl-card-gray {
    background: var(--surface-low);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .sl-card-bordered {
    background: var(--surface-white);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid var(--surface-mid);
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    margin-bottom: 1.5rem;
  }

  .sl-card-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--primary);
    font-family: 'Public Sans', sans-serif;
  }

  /* ── Info label/value ── */
  .info-label {
    display: block;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--secondary);
    margin-bottom: 0.3rem;
  }
  .info-value {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--on-surface);
  }
  .info-divider {
    border: none;
    border-top: 1px solid var(--surface-mid);
    margin: 1.5rem 0;
  }

  /* ── Badge type demande ── */
  .badge-type {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.7rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--secondary-container);
    color: var(--on-secondary-container);
  }

  /* ── Priority ── */
  .priority-high {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 600;
    color: var(--tertiary-container);
    font-size: 0.9375rem;
  }

  /* ── Document items ── */
  .doc-item {
    background: var(--surface-white);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    transition: background 0.15s;
  }
  .doc-item:hover { background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
  .doc-icon {
    width: 40px; height: 40px;
    background: rgba(0,30,64,0.05);
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    color: var(--primary);
    font-size: 1.3rem;
    flex-shrink: 0;
  }
  .doc-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--on-surface);
  }
  .doc-meta { font-size: 0.75rem; color: var(--secondary); }
  .btn-doc-action {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--secondary);
    padding: 0.4rem;
    border-radius: 6px;
    transition: color 0.15s;
    font-size: 1.1rem;
    display: flex; align-items: center;
  }
  .btn-doc-action:hover { color: var(--primary); }
  .btn-upload {
    display: flex; align-items: center; gap: 0.3rem;
    background: none; border: none; cursor: pointer;
    color: var(--primary); font-size: 0.875rem; font-weight: 600;
    font-family: 'Inter', sans-serif;
    transition: opacity 0.15s;
  }
  .btn-upload:hover { opacity: 0.7; }

  /* ── Case Notes ── */
  .note-bubble {
    background: var(--surface);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .note-officer {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--primary);
  }
  .note-date { font-size: 0.75rem; color: var(--secondary); }
  .note-text {
    font-size: 0.875rem;
    color: var(--on-surface-var);
    line-height: 1.6;
    margin-top: 0.4rem;
  }
  .note-textarea {
    width: 100%;
    background: var(--surface-low);
    border: none;
    border-radius: 8px;
    padding: 1rem;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    min-height: 100px;
    resize: vertical;
    color: var(--on-surface);
  }
  .note-textarea:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary);
  }
  .btn-post-note {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.4rem 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
  }
  .btn-post-note:hover { background: var(--primary-container); }

  /* ── RIGHT COLUMN: Actions sidebar ── */
  .actions-sidebar {
    background: var(--primary-container);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .actions-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #fff;
    font-family: 'Public Sans', sans-serif;
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .btn-action-white {
    width: 100%;
    background: #fff;
    color: var(--primary);
    border: none;
    border-radius: 8px;
    padding: 0.75rem;
    font-weight: 700;
    font-size: 0.875rem;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    cursor: pointer;
    margin-bottom: 0.75rem;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
  }
  .btn-action-white:hover { background: var(--secondary-container); }

  .btn-action-ghost {
    width: 100%;
    background: rgba(0,30,64,0.4);
    border: 1px solid rgba(121,157,214,0.3);
    color: var(--on-primary-container);
    border-radius: 8px;
    padding: 0.75rem;
    font-weight: 700;
    font-size: 0.875rem;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    cursor: pointer;
    margin-bottom: 0.75rem;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
  }
  .btn-action-ghost:hover { background: rgba(0,30,64,0.6); }

  .btn-action-danger {
    width: 100%;
    background: rgba(186,26,26,0.1);
    border: 1px solid rgba(186,26,26,0.3);
    color: var(--error-container);
    border-radius: 8px;
    padding: 0.75rem;
    font-weight: 700;
    font-size: 0.875rem;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    cursor: pointer;
    margin-bottom: 0;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
  }
  .btn-action-danger:hover { background: rgba(186,26,26,0.2); }

  .status-divider {
    border: none;
    border-top: 1px solid rgba(121,157,214,0.2);
    margin: 1.5rem 0;
  }
  .status-label {
    display: block;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--on-primary-container);
    margin-bottom: 0.75rem;
  }
  .status-select {
    width: 100%;
    background: var(--primary);
    color: #fff;
    border: 1px solid rgba(121,157,214,0.3);
    border-radius: 8px;
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
  }

  /* ── Progress timeline ── */
  .progress-card {
    background: var(--surface-highest);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .progress-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--primary);
    margin-bottom: 1.5rem;
  }
  .timeline-item {
    display: flex;
    gap: 1rem;
    padding-bottom: 1.5rem;
    position: relative;
  }
  .timeline-item:last-child { padding-bottom: 0; }
  .timeline-dot-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }
  .timeline-dot {
    width: 14px; height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .timeline-dot.done {
    background: var(--primary);
    box-shadow: 0 0 0 4px rgba(0,30,64,0.15);
  }
  .timeline-dot.pending { background: var(--primary-fixed-dim); }
  .timeline-line {
    width: 2px;
    flex: 1;
    margin-top: 4px;
  }
  .timeline-line.done    { background: var(--primary); }
  .timeline-line.pending { background: var(--primary-fixed-dim); }
  .timeline-step-title-done   { font-size: 0.875rem; font-weight: 700; color: var(--on-surface); }
  .timeline-step-title-pending{ font-size: 0.875rem; font-weight: 700; color: var(--secondary); }
  .timeline-step-date-done    { font-size: 0.75rem; color: var(--secondary); }
  .timeline-step-date-pending { font-size: 0.75rem; color: var(--outline); }

  /* ── Regulatory context card ── */
  .regulatory-card {
    background: var(--tertiary-fixed);
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid rgba(255,182,144,0.3);
  }
  .regulatory-header {
    display: flex; align-items: center; gap: 0.5rem;
    color: var(--on-tertiary-fixed-variant);
    margin-bottom: 0.5rem;
  }
  .regulatory-title {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .regulatory-text {
    font-size: 0.75rem;
    color: var(--on-tertiary-fixed-variant);
    line-height: 1.6;
    opacity: 0.85;
  }
`;